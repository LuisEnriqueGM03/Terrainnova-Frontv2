const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Función para refrescar token
async function refreshTokenIfNeeded(): Promise<boolean> {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken') || localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (res.ok) {
      const data = await res.json();
      sessionStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('accessToken', data.access_token);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// Función para hacer request con retry en caso de 401
// Función para hacer request con retry en caso de 401 y siempre incluir el token
export async function makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
  // Obtener el token actual
  const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  // Siempre incluir Content-Type si es POST/PUT
  if (!headers.has('Content-Type') && (options.method === 'POST' || options.method === 'PUT')) {
    headers.set('Content-Type', 'application/json');
  }

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // Intentar refrescar token
    const refreshed = await refreshTokenIfNeeded();
    if (refreshed) {
      const newToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');
      if (newToken) {
        headers.set('Authorization', `Bearer ${newToken}`);
      }
      response = await fetch(url, { ...options, headers });
    }
  }

  return response;
}

export async function checkoutCarrito(): Promise<{ url: string }> {
  const res = await makeAuthenticatedRequest(`${API_URL}/carrito/checkout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Error al iniciar checkout');
  const data = await res.json();
  
  console.log('Checkout response:', data);
  
  // Si el backend retorna una URL de Stripe, usarla
  if (data.url) {
    return { url: data.url };
  }
  
  // Si el backend retorna información del carrito pero no URL de Stripe
  if (data.success && data.carrito) {
    console.log('Carrito listo para checkout:', data.carrito);
    // Por ahora simulamos una URL de Stripe
    return {
      url: `${import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173'}/success?session_id=temp_${Date.now()}`
    };
  }
  
  throw new Error('Respuesta inesperada del servidor');
}

// Obtener carrito del backend
export async function getCarritoBackend(): Promise<{ id: number, items: any[] }> {
  const res = await makeAuthenticatedRequest(`${API_URL}/carrito`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error al obtener carrito');
  const data = await res.json();
  // data debe tener id y items
  return {
    id: data.id,
    items: Array.isArray(data.items) ? data.items.map((item: any) => ({
      productoId: item.producto?.id || item.productoId,
      nombre: item.producto?.nombre || 'Producto sin nombre',
      precio: Number(item.precio) || 0,
      imagenUrl: item.producto?.imagenUrl,
      cantidad: Number(item.cantidad) || 1,
      stock: item.producto?.stock,
    })) : []
  };
}

// Sincronizar carrito del frontend al backend
export async function sincronizarCarrito(items: any[]): Promise<void> {
  // Para cada item, agregarlo al carrito del backend
  for (const item of items) {
    await addItemBackend(item);
  }
}

// Añadir item al carrito del backend
export async function addItemBackend(item: any): Promise<void> {
  console.log('Añadiendo item al backend:', item);
  
  const res = await makeAuthenticatedRequest(`${API_URL}/carrito/agregar`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productoId: item.productoId,
      cantidad: item.cantidad,
    }),
  });
  if (!res.ok) throw new Error('Error al añadir item al carrito');
}

// Actualizar cantidad en el backend
export async function updateCantidadBackend(productoId: number, cantidad: number): Promise<void> {
  const res = await makeAuthenticatedRequest(`${API_URL}/carrito/actualizar/${productoId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cantidad }),
  });
  if (!res.ok) throw new Error('Error al actualizar cantidad');
}

// Remover item del backend
export async function removeItemBackend(productoId: number): Promise<void> {
  const res = await makeAuthenticatedRequest(`${API_URL}/carrito/remover/${productoId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error al remover item');
}

// Limpiar carrito del backend
export async function clearCarritoBackend(): Promise<void> {
  const res = await makeAuthenticatedRequest(`${API_URL}/carrito/limpiar`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error al limpiar carrito');
}

export async function checkoutStripe(carritoId: number): Promise<{ url: string }> {
  const res = await makeAuthenticatedRequest(`${API_URL}/stripe/checkout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ carritoId }),
  });
  if (!res.ok) throw new Error('Error al iniciar checkout con Stripe');
  const data = await res.json();
  if (data.url) {
    return { url: data.url };
  }
  throw new Error('Respuesta inesperada del servidor');
} 