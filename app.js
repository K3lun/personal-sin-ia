// SISTEMA COMPLETO BONELESS ADRIAN - CORREGIDO Y FUNCIONAL

// Configuracion inicial
const defaultConfig = {
    businessName: 'Boneless Adrian',
    heroTitle: 'Boneless de calidad superior',
    heroDescription: 'Crujientes, jugosos y preparados al momento. Personaliza tu pedido como prefieras.',
    facebook: 'https://facebook.com/bonelessadrian',
    instagram: 'https://instagram.com/bonelessadrian',
    whatsapp: 'https://wa.me/524421234567',
    schedule: 'Lunes a Domingo<br>12:00 PM - 10:00 PM',
    address: 'Av. Principal #123<br>Querétaro, QRO',
    phone: '4421234567',
    email: 'contacto@bonelessadrian.com',
    delivery: false,
    paymentCash: true,
    paymentCard: true,
    investment: 10000
};

const defaultProducts = [
    {
        id: 1,
        name: 'Boneless Clásicos',
        price: 89,
        cost: 40,
        image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&h=400&fit=crop',
        category: 'clasicos',
        sauces: ['BBQ', 'Búfalo', 'Miel Mostaza'],
        sizes: ['6 piezas', '10 piezas', '15 piezas'],
        active: true
    },
    {
        id: 2,
        name: 'Boneless Picantes',
        price: 99,
        cost: 45,
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&h=400&fit=crop',
        category: 'picantes',
        sauces: ['Habanero', 'Chipotle', 'Salsa Diablo'],
        sizes: ['6 piezas', '10 piezas', '15 piezas'],
        active: true
    },
    {
        id: 3,
        name: 'Boneless Premium',
        price: 119,
        cost: 50,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=400&fit=crop',
        category: 'premium',
        sauces: ['BBQ Premium', 'Queso Cheddar', 'Ranch'],
        sizes: ['6 piezas', '10 piezas', '15 piezas'],
        active: true
    }
];

// Estado global
let config = JSON.parse(localStorage.getItem('boneless_config') || JSON.stringify(defaultConfig));
let products = JSON.parse(localStorage.getItem('boneless_products') || JSON.stringify(defaultProducts));
let cart = JSON.parse(localStorage.getItem('boneless_cart') || '[]');
let orders = JSON.parse(localStorage.getItem('boneless_orders') || '[]');
let user = JSON.parse(localStorage.getItem('boneless_user') || 'null');

// Funciones de utilidad
function sanitize(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function saveConfig() {
    localStorage.setItem('boneless_config', JSON.stringify(config));
}

function saveProducts() {
    localStorage.setItem('boneless_products', JSON.stringify(products));
}

function saveCart() {
    localStorage.setItem('boneless_cart', JSON.stringify(cart));
}

function saveOrders() {
    localStorage.setItem('boneless_orders', JSON.stringify(orders));
}

// Inicializar aplicacion
function init() {
    console.log('Iniciando aplicación...');
    updateBusinessInfo();
    renderMenu();
    updateCartCount();
    updateUserSection();
    updateSocialLinks();
    updateInfo();
    console.log('Aplicación iniciada correctamente');
}

// Actualizar información del negocio
function updateBusinessInfo() {
    const businessNameEl = document.getElementById('businessName');
    const heroTitleEl = document.getElementById('heroTitle');
    const heroDescEl = document.getElementById('heroDescription');
    
    if (businessNameEl) businessNameEl.textContent = config.businessName;
    if (heroTitleEl) heroTitleEl.textContent = config.heroTitle;
    if (heroDescEl) heroDescEl.textContent = config.heroDescription;
}

// Actualizar links de redes sociales
function updateSocialLinks() {
    const fbLink = document.getElementById('facebookLink');
    const igLink = document.getElementById('instagramLink');
    const waLink = document.getElementById('whatsappLink');
    const callBtn = document.getElementById('callBtn');
    
    if (fbLink) fbLink.href = config.facebook;
    if (igLink) igLink.href = config.instagram;
    if (waLink) waLink.href = config.whatsapp;
    if (callBtn) callBtn.href = `tel:${config.phone}`;
}

// Actualizar informacion de contacto
function updateInfo() {
    const scheduleEl = document.getElementById('scheduleText');
    const addressEl = document.getElementById('addressText');
    const emailEl = document.getElementById('contactEmail');
    const phoneEl = document.getElementById('contactPhone');
    const paymentEl = document.getElementById('paymentMethodsText');
    
    if (scheduleEl) scheduleEl.innerHTML = config.schedule;
    if (addressEl) addressEl.innerHTML = config.address;
    if (emailEl) emailEl.textContent = config.email;
    if (phoneEl) phoneEl.textContent = `Tel: ${config.phone}`;
    
    if (paymentEl) {
        let payment = [];
        if (config.paymentCash) payment.push('Efectivo');
        if (config.paymentCard) payment.push('Tarjeta');
        paymentEl.textContent = payment.join(' y ') || 'No disponible';
    }
}

// Renderizar menu de productos
function renderMenu() {
    console.log('Renderizando menú...', products);
    const grid = document.getElementById('menuGrid');
    if (!grid) {
        console.error('No se encontró el elemento menuGrid');
        return;
    }
    
    const activeProducts = products.filter(p => p.active);
    
    if (activeProducts.length === 0) {
        grid.innerHTML = '<p class="col-span-full text-center text-gray-500 py-12">No hay productos disponibles</p>';
        return;
    }
    
    grid.innerHTML = activeProducts.map(p => `
        <div class="card-hover bg-white rounded-2xl border-2 border-gray-100 overflow-hidden cursor-pointer" onclick="openCustomizer(${p.id})">
            <img src="${p.image}" class="w-full h-56 object-cover" alt="${sanitize(p.name)}" onerror="this.src='https://via.placeholder.com/500x400?text=Imagen+no+disponible'">
            <div class="p-6">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="font-bold text-xl">${sanitize(p.name)}</h3>
                    <span class="text-2xl font-black text-orange-500">$${p.price}</span>
                </div>
                <p class="text-sm text-gray-600 mb-4">Personaliza tu orden</p>
                <button class="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30">
                    Ordenar Ahora
                </button>
            </div>
        </div>
    `).join('');
    
    console.log('Menú renderizado correctamente');
}

// Abrir personalizador de producto
function openCustomizer(id) {
    const p = products.find(x => x.id === id);
    if (!p) {
        console.error('Producto no encontrado:', id);
        return;
    }
    
    const modal = document.getElementById('cartModal');
    const div = document.createElement('div');
    div.className = 'bg-white rounded-2xl max-w-lg w-full p-6 fade-in';
    div.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${sanitize(p.name)}</h2>
        <img src="${p.image}" class="w-full h-48 object-cover rounded-xl mb-4" alt="${sanitize(p.name)}">
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-semibold mb-2">Tamaño</label>
                <select id="customSize" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none">
                    ${p.sizes.map(s => `<option value="${sanitize(s)}">${sanitize(s)}</option>`).join('')}
                </select>
            </div>
            <div>
                <label class="block text-sm font-semibold mb-2">Salsa</label>
                <select id="customSauce" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none">
                    ${p.sauces.map(s => `<option value="${sanitize(s)}">${sanitize(s)}</option>`).join('')}
                </select>
            </div>
            <div>
                <label class="block text-sm font-semibold mb-2">Instrucciones especiales (opcional)</label>
                <textarea id="customNotes" rows="3" placeholder="Ej: Sin cebolla, extra picante..." class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"></textarea>
            </div>
            <div class="flex gap-3 pt-2">
                <button onclick="closeModal()" class="flex-1 py-3 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition">
                    Cancelar
                </button>
                <button onclick="addToCart(${id})" class="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg">
                    Agregar $${p.price}
                </button>
            </div>
        </div>
    `;
    modal.innerHTML = '';
    modal.appendChild(div);
    modal.classList.remove('hidden');
}

// Agregar producto al carrito
function addToCart(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    
    const size = document.getElementById('customSize').value;
    const sauce = document.getElementById('customSauce').value;
    const notes = sanitize(document.getElementById('customNotes').value);
    
    cart.push({
        ...p,
        customId: Date.now(),
        size,
        sauce,
        notes,
        quantity: 1
    });
    
    saveCart();
    updateCartCount();
    closeModal();
    showNotification('Producto agregado al carrito');
}

// Actualizar contador del carrito
function updateCartCount() {
    const badge = document.getElementById('cartCount');
    if (!badge) return;
    
    if (cart.length > 0) {
        badge.classList.remove('hidden');
        badge.textContent = cart.length;
    } else {
        badge.classList.add('hidden');
    }
}

// Abrir carrito
function toggleCart() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    
    const modal = document.getElementById('cartModal');
    const div = document.createElement('div');
    div.className = 'bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto custom-scrollbar slide-in';
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    div.innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Tu Carrito</h2>
            <button onclick="closeModal()" class="p-2 hover:bg-gray-100 rounded-lg transition">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
        
        <div class="space-y-4 mb-6">
            ${cart.map((item, idx) => `
                <div class="flex gap-4 border-b border-gray-100 pb-4">
                    <img src="${item.image}" class="w-24 h-24 object-cover rounded-xl" alt="${sanitize(item.name)}">
                    <div class="flex-1">
                        <div class="flex justify-between mb-2">
                            <div>
                                <h3 class="font-bold text-lg">${sanitize(item.name)}</h3>
                                <p class="text-sm text-gray-600">${sanitize(item.size)} · ${sanitize(item.sauce)}</p>
                                ${item.notes ? `<p class="text-xs text-gray-500 mt-1">${sanitize(item.notes)}</p>` : ''}
                            </div>
                            <button onclick="removeFromCart(${idx})" class="text-red-500 hover:text-red-700 transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                                <button onclick="updateQty(${idx}, -1)" class="px-3 py-1 font-bold text-lg hover:text-orange-500 transition">−</button>
                                <span class="font-bold w-8 text-center">${item.quantity}</span>
                                <button onclick="updateQty(${idx}, 1)" class="px-3 py-1 font-bold text-lg hover:text-orange-500 transition">+</button>
                            </div>
                            <span class="font-black text-xl text-orange-500">$${item.price * item.quantity}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="border-t-2 border-gray-200 pt-4 mb-6">
            <div class="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>Subtotal:</span>
                <span class="font-semibold">$${total}</span>
            </div>
            ${!config.delivery ? '<p class="text-sm text-gray-600 mb-2">Para recoger en tienda</p>' : ''}
            <div class="flex justify-between items-center text-2xl font-black mt-3">
                <span>Total:</span>
                <span class="text-orange-500">$${total}</span>
            </div>
        </div>
        
        <button onclick="showCheckout()" class="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30">
            Continuar con el Pedido
        </button>
    `;
    
    modal.innerHTML = '';
    modal.appendChild(div);
    modal.classList.remove('hidden');
}

// Actualizar cantidad en carrito
function updateQty(idx, delta) {
    cart[idx].quantity += delta;
    if (cart[idx].quantity <= 0) {
        cart.splice(idx, 1);
    }
    saveCart();
    updateCartCount();
    if (cart.length > 0) {
        toggleCart();
    } else {
        closeModal();
    }
}

// Eliminar del carrito
function removeFromCart(idx) {
    cart.splice(idx, 1);
    saveCart();
    updateCartCount();
    if (cart.length > 0) {
        toggleCart();
    } else {
        closeModal();
    }
}

// Mostrar checkout
function showCheckout() {
    const modal = document.getElementById('cartModal');
    const div = document.createElement('div');
    div.className = 'bg-white rounded-2xl max-w-lg w-full p-6 fade-in';
    
    let paymentOptions = [];
    if (config.paymentCash) paymentOptions.push('<option value="efectivo">Efectivo</option>');
    if (config.paymentCard) paymentOptions.push('<option value="tarjeta">Tarjeta</option>');
    
    if (paymentOptions.length === 0) {
        showNotification('No hay métodos de pago disponibles');
        closeModal();
        return;
    }
    
    div.innerHTML = `
        <h2 class="text-2xl font-bold mb-6">Finalizar Pedido</h2>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-semibold mb-2">Nombre completo</label>
                <input type="text" id="customerName" placeholder="Juan Pérez" class="input-field">
            </div>
            <div>
                <label class="block text-sm font-semibold mb-2">Email</label>
                <input type="email" id="customerEmail" placeholder="juan@ejemplo.com" class="input-field">
            </div>
            <div>
                <label class="block text-sm font-semibold mb-2">Teléfono</label>
                <input type="tel" id="customerPhone" placeholder="442 123 4567" class="input-field">
            </div>
            <div>
                <label class="block text-sm font-semibold mb-2">Método de pago</label>
                <select id="paymentMethod" class="input-field">
                    ${paymentOptions.join('')}
                </select>
            </div>
            <div class="bg-orange-50 border-2 border-orange-200 p-4 rounded-xl">
                <p class="text-sm font-bold text-orange-900 mb-1">Recoger en:</p>
                <p class="text-sm text-orange-800">${config.address.replace(/<br>/g, ', ')}</p>
            </div>
            <div class="flex gap-3 pt-2">
                <button onclick="toggleCart()" class="flex-1 py-3 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition">
                    Volver
                </button>
                <button onclick="confirmOrder()" class="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg">
                    Confirmar Pedido
                </button>
            </div>
        </div>
    `;
    
    modal.innerHTML = '';
    modal.appendChild(div);
}

// Confirmar pedido
function confirmOrder() {
    const name = sanitize(document.getElementById('customerName').value.trim());
    const email = sanitize(document.getElementById('customerEmail').value.trim());
    const phone = sanitize(document.getElementById('customerPhone').value.trim());
    const payment = document.getElementById('paymentMethod').value;
    
    if (!name || !email || !phone) {
        showNotification('Por favor completa todos los campos');
        return;
    }
    
    const order = {
        id: Date.now(),
        items: cart.map(item => ({...item})),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        customer: { name, email, phone },
        payment,
        status: 'pendiente',
        date: new Date().toISOString()
    };
    
    orders.push(order);
    saveOrders();
    sendEmailNotification(order);
    
    cart = [];
    saveCart();
    updateCartCount();
    closeModal();
    
    showNotification('¡Pedido confirmado! Recibirás un email con los detalles.');
}

// Enviar email (simulado - en consola)
function sendEmailNotification(order) {
    console.log('===== EMAIL ENVIADO =====');
    console.log('Para:', order.customer.email);
    console.log('Asunto: Pedido #' + order.id);
    console.log('Estado:', order.status);
    console.log('Total: $' + order.total);
    console.log('========================');
}

// Sistema de usuario
function updateUserSection() {
    const section = document.getElementById('userSection');
    const adminBtn = document.getElementById('adminBtn');
    
    if (!section) return;
    
    if (user) {
        section.innerHTML = `
            <button onclick="logout()" class="text-sm font-medium text-gray-700 hover:text-orange-500 transition">
                ${sanitize(user.email.split('@')[0])} (Salir)
            </button>
        `;
        if (adminBtn && user.role === 'admin') {
            adminBtn.classList.remove('hidden');
        }
    } else {
        section.innerHTML = `
            <button onclick="showLogin()" class="text-sm font-medium text-gray-700 hover:text-orange-500 transition">
                Login
            </button>
        `;
        if (adminBtn) {
            adminBtn.classList.add('hidden');
        }
    }
}

// Mostrar login
function showLogin() {
    const modal = document.getElementById('loginModal');
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-sm w-full p-6 fade-in">
            <h2 class="text-2xl font-bold mb-6">Iniciar Sesión</h2>
            <div class="space-y-4">
                <input type="email" id="loginEmail" placeholder="Email" class="input-field">
                <input type="password" id="loginPassword" placeholder="Contraseña" class="input-field">
                <button onclick="login()" class="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition">
                    Entrar
                </button>
                <button onclick="closeLoginModal()" class="w-full border-2 border-gray-300 py-3 rounded-xl font-bold hover:bg-gray-50 transition">
                    Cancelar
                </button>
                <p class="text-xs text-gray-500 text-center mt-4">
                    Admin: admin@boneless.com / admin123
                </p>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

// Login
function login() {
    const email = sanitize(document.getElementById('loginEmail').value.trim());
    const password = document.getElementById('loginPassword').value;
    
    if (email === 'admin@boneless.com' && password === 'admin123') {
        user = { email, role: 'admin' };
        localStorage.setItem('boneless_user', JSON.stringify(user));
        closeLoginModal();
        updateUserSection();
        showAdmin();
    } else {
        showNotification('Credenciales incorrectas');
    }
}

// Logout
function logout() {
    user = null;
    localStorage.removeItem('boneless_user');
    updateUserSection();
    location.reload();
}

// Cerrar modales
function closeModal() {
    const modal = document.getElementById('cartModal');
    if (modal) modal.classList.add('hidden');
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.add('hidden');
}

// Notificaciones
function showNotification(message) {
    const notif = document.createElement('div');
    notif.textContent = message;
    notif.className = 'fixed top-24 right-6 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl z-50 fade-in font-medium';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// PANEL ADMIN COMPLETO
function showAdmin() {
    if (!user || user.role !== 'admin') return;
    
    const modal = document.getElementById('adminModal');
    modal.innerHTML = `
        <div class="bg-gray-50 min-h-screen">
            <div class="bg-white border-b sticky top-0 z-20 shadow-sm">
                <div class="max-w-7xl mx-auto px-6 py-4">
                    <div class="flex justify-between items-center">
                        <h1 class="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                        <button onclick="closeAdmin()" class="px-6 py-2 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition">
                            Cerrar Panel
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="max-w-7xl mx-auto p-6">
                <div class="bg-white rounded-2xl border-2 border-gray-200 mb-6 overflow-hidden">
                    <div class="flex border-b-2 border-gray-200 overflow-x-auto">
                        <button onclick="showAdminTab('dashboard')" class="admin-tab active" id="tab-dashboard">
                            📊 Dashboard
                        </button>
                        <button onclick="showAdminTab('products')" class="admin-tab" id="tab-products">
                            🍗 Productos
                        </button>
                        <button onclick="showAdminTab('orders')" class="admin-tab" id="tab-orders">
                            📦 Pedidos
                        </button>
                        <button onclick="showAdminTab('config')" class="admin-tab" id="tab-config">
                            ⚙️ Configuración
                        </button>
                    </div>
                </div>
                
                <div id="adminContent" class="fade-in"></div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
    showAdminTab('dashboard');
}

function closeAdmin() {
    document.getElementById('adminModal').classList.add('hidden');
}

function showAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    const tabBtn = document.getElementById(`tab-${tab}`);
    if (tabBtn) tabBtn.classList.add('active');
    
    const content = document.getElementById('adminContent');
    if (!content) return;
    
    if (tab === 'dashboard') {
        renderDashboard(content);
    } else if (tab === 'products') {
        renderProductsAdmin(content);
    } else if (tab === 'orders') {
        renderOrdersAdmin(content);
    } else if (tab === 'config') {
        renderConfigAdmin(content);
    }
}

function renderDashboard(content) {
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
    const totalCosts = orders.reduce((sum, o) => {
        return sum + o.items.reduce((itemSum, item) => itemSum + ((item.cost || 0) * item.quantity), 0);
    }, 0);
    const profit = totalSales - totalCosts - config.investment;
    const profitPercent = config.investment > 0 ? ((profit / config.investment) * 100).toFixed(1) : 0;
    
    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="stat-card">
                <div class="stat-value">${totalOrders}</div>
                <div class="stat-label">Total Pedidos</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${totalSales.toLocaleString()}</div>
                <div class="stat-label">Ventas Totales</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${profit.toLocaleString()}</div>
                <div class="stat-label">Ganancia Neta</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${profitPercent}%</div>
                <div class="stat-label">ROI</div>
            </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-2xl border-2 border-gray-200">
                <h3 class="text-xl font-bold mb-4">Análisis Financiero</h3>
                <div class="space-y-3">
                    <div class="flex justify-between py-3 border-b-2 border-gray-100">
                        <span class="font-semibold text-gray-700">Inversión Inicial:</span>
                        <span class="font-bold text-lg">${config.investment.toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between py-3 border-b-2 border-gray-100">
                        <span class="font-semibold text-gray-700">Costos Totales:</span>
                        <span class="font-bold text-lg text-red-600">-${totalCosts.toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between py-3 border-b-2 border-gray-100">
                        <span class="font-semibold text-gray-700">Ventas Totales:</span>
                        <span class="font-bold text-lg text-green-600">+${totalSales.toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between py-4 bg-orange-50 px-4 rounded-xl">
                        <span class="font-black text-lg">Balance Final:</span>
                        <span class="font-black text-2xl ${profit >= 0 ? 'text-green-600' : 'text-red-600'}">
                            ${profit >= 0 ? '+' : ''}${profit.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-2xl border-2 border-gray-200">
                <h3 class="text-xl font-bold mb-4">Productos Activos</h3>
                <div class="space-y-3">
                    ${products.filter(p => p.active).map(p => `
                        <div class="flex items-center justify-between py-3 border-b border-gray-100">
                            <div class="flex items-center gap-3">
                                <img src="${p.image}" class="w-12 h-12 object-cover rounded-lg" alt="${sanitize(p.name)}">
                                <div>
                                    <p class="font-semibold">${sanitize(p.name)}</p>
                                    <p class="text-sm text-gray-600">${p.price}</p>
                                </div>
                            </div>
                            <span class="badge badge-success">Activo</span>
                        </div>
                    `).join('') || '<p class="text-gray-500 text-center py-8">No hay productos activos</p>'}
                </div>
            </div>
        </div>
    `;
}

function renderProductsAdmin(content) {
    content.innerHTML = `
        <div class="mb-6">
            <button onclick="addNewProduct()" class="btn-primary">
                + Agregar Nuevo Producto
            </button>
        </div>
        
        <div class="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Costo</th>
                            <th>Margen</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${products.map(p => {
                            const margin = p.price - (p.cost || 0);
                            const marginPercent = p.price > 0 ? ((margin / p.price) * 100).toFixed(0) : 0;
                            return `
                                <tr>
                                    <td>
                                        <div class="flex items-center gap-3">
                                            <img src="${p.image}" class="w-12 h-12 object-cover rounded-lg" alt="${sanitize(p.name)}">
                                            <span class="font-semibold">${sanitize(p.name)}</span>
                                        </div>
                                    </td>
                                    <td class="font-bold text-lg">${p.price}</td>
                                    <td class="text-gray-600">${p.cost || 0}</td>
                                    <td>
                                        <span class="badge ${margin > 0 ? 'badge-success' : 'badge-danger'}">
                                            ${marginPercent}% (${margin})
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge ${p.active ? 'badge-success' : 'badge-danger'}">
                                            ${p.active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="flex gap-2">
                                            <button onclick="editProduct(${p.id})" class="text-blue-600 hover:text-blue-700 font-semibold">Editar</button>
                                            <button onclick="toggleProductStatus(${p.id})" class="text-gray-600 hover:text-gray-700 font-semibold">
                                                ${p.active ? 'Desactivar' : 'Activar'}
                                            </button>
                                            <button onclick="deleteProduct(${p.id})" class="text-red-600 hover:text-red-700 font-semibold">Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function addNewProduct() {
    const modal = document.getElementById('cartModal');
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-2xl w-full p-6 fade-in max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h2 class="text-2xl font-bold mb-6">Agregar Producto</h2>
            <div class="space-y-4">
                <input type="text" id="newName" placeholder="Nombre del producto" class="input-field">
                <input type="number" id="newPrice" placeholder="Precio de venta" class="input-field">
                <input type="number" id="newCost" placeholder="Costo del producto" class="input-field">
                <input type="url" id="newImage" placeholder="URL de la imagen" class="input-field">
                <input type="text" id="newCategory" placeholder="Categoría" class="input-field">
                <input type="text" id="newSauces" placeholder="Salsas (separadas por coma)" class="input-field">
                <input type="text" id="newSizes" placeholder="Tamaños (separados por coma)" class="input-field">
                <div class="flex gap-3">
                    <button onclick="closeModal()" class="btn-secondary flex-1">Cancelar</button>
                    <button onclick="saveNewProduct()" class="btn-primary flex-1">Guardar Producto</button>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

function saveNewProduct() {
    const name = sanitize(document.getElementById('newName').value.trim());
    const price = parseInt(document.getElementById('newPrice').value);
    const cost = parseInt(document.getElementById('newCost').value);
    const image = document.getElementById('newImage').value.trim();
    const category = sanitize(document.getElementById('newCategory').value.trim());
    const sauces = document.getElementById('newSauces').value.split(',').map(s => sanitize(s.trim())).filter(Boolean);
    const sizes = document.getElementById('newSizes').value.split(',').map(s => sanitize(s.trim())).filter(Boolean);
    
    if (!name || !price || !cost || !image || !category || sauces.length === 0 || sizes.length === 0) {
        showNotification('Por favor completa todos los campos');
        return;
    }
    
    const newProduct = {
        id: Date.now(),
        name,
        price,
        cost,
        image,
        category,
        sauces,
        sizes,
        active: true
    };
    
    products.push(newProduct);
    saveProducts();
    closeModal();
    renderMenu();
    showAdmin();
    showAdminTab('products');
    showNotification('Producto agregado exitosamente');
}

function editProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    
    const modal = document.getElementById('cartModal');
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-2xl w-full p-6 fade-in max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h2 class="text-2xl font-bold mb-6">Editar Producto</h2>
            <div class="space-y-4">
                <input type="text" id="editName" value="${sanitize(p.name)}" class="input-field">
                <input type="number" id="editPrice" value="${p.price}" class="input-field">
                <input type="number" id="editCost" value="${p.cost || 0}" class="input-field">
                <input type="url" id="editImage" value="${p.image}" class="input-field">
                <input type="text" id="editCategory" value="${sanitize(p.category)}" class="input-field">
                <input type="text" id="editSauces" value="${p.sauces.join(', ')}" class="input-field">
                <input type="text" id="editSizes" value="${p.sizes.join(', ')}" class="input-field">
                <div class="flex gap-3">
                    <button onclick="closeModal()" class="btn-secondary flex-1">Cancelar</button>
                    <button onclick="saveEditProduct(${id})" class="btn-primary flex-1">Guardar Cambios</button>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

function saveEditProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    
    p.name = sanitize(document.getElementById('editName').value.trim());
    p.price = parseInt(document.getElementById('editPrice').value);
    p.cost = parseInt(document.getElementById('editCost').value);
    p.image = document.getElementById('editImage').value.trim();
    p.category = sanitize(document.getElementById('editCategory').value.trim());
    p.sauces = document.getElementById('editSauces').value.split(',').map(s => sanitize(s.trim())).filter(Boolean);
    p.sizes = document.getElementById('editSizes').value.split(',').map(s => sanitize(s.trim())).filter(Boolean);
    
    saveProducts();
    closeModal();
    renderMenu();
    showAdmin();
    showAdminTab('products');
    showNotification('Producto actualizado exitosamente');
}

function toggleProductStatus(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    
    p.active = !p.active;
    saveProducts();
    renderMenu();
    showAdmin();
    showAdminTab('products');
    showNotification(`Producto ${p.active ? 'activado' : 'desactivado'}`);
}

function deleteProduct(id) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    products = products.filter(p => p.id !== id);
    saveProducts();
    renderMenu();
    showAdmin();
    showAdminTab('products');
    showNotification('Producto eliminado');
}

function renderOrdersAdmin(content) {
    const statusColors = {
        pendiente: 'badge-warning',
        preparando: 'badge-info',
        listo: 'badge-success',
        entregado: 'badge-success',
        cancelado: 'badge-danger'
    };
    
    content.innerHTML = `
        <div class="space-y-4">
            ${orders.length === 0 ? '<div class="bg-white rounded-2xl border-2 border-gray-200 p-12 text-center"><p class="text-gray-500 text-lg">No hay pedidos registrados</p></div>' : ''}
            ${orders.slice().reverse().map(o => `
                <div class="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:shadow-lg transition">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="font-bold text-xl">Pedido #${o.id}</h3>
                            <p class="text-sm text-gray-600">${new Date(o.date).toLocaleString()}</p>
                        </div>
                        <span class="badge ${statusColors[o.status]} text-sm">${o.status.toUpperCase()}</span>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <p class="text-sm font-bold text-gray-700 mb-2">Cliente</p>
                            <p class="font-semibold">${sanitize(o.customer.name)}</p>
                            <p class="text-sm text-gray-600">${sanitize(o.customer.email)}</p>
                            <p class="text-sm text-gray-600">${sanitize(o.customer.phone)}</p>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-gray-700 mb-2">Pago</p>
                            <p class="font-semibold capitalize">${o.payment}</p>
                        </div>
                    </div>
                    
                    <div class="border-t-2 border-gray-100 pt-4 mb-4">
                        <p class="text-sm font-bold text-gray-700 mb-3">Productos</p>
                        ${o.items.map(item => `
                            <div class="flex justify-between text-sm mb-2 py-1">
                                <span>${item.quantity}x ${sanitize(item.name)} (${sanitize(item.size)}, ${sanitize(item.sauce)})</span>
                                <span class="font-bold">${item.price * item.quantity}</span>
                            </div>
                        `).join('')}
                        <div class="flex justify-between font-black text-xl mt-4 pt-4 border-t-2 border-gray-200">
                            <span>Total:</span>
                            <span class="text-orange-500">${o.total}</span>
                        </div>
                    </div>
                    
                    <div class="flex gap-2 flex-wrap">
                        <button onclick="updateOrderStatus(${o.id}, 'preparando')" class="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition">
                            Preparando
                        </button>
                        <button onclick="updateOrderStatus(${o.id}, 'listo')" class="px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition">
                            Listo
                        </button>
                        <button onclick="updateOrderStatus(${o.id}, 'entregado')" class="px-4 py-2 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition">
                            Entregado
                        </button>
                        <button onclick="updateOrderStatus(${o.id}, 'cancelado')" class="px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition">
                            Cancelar
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    order.status = newStatus;
    saveOrders();
    sendEmailNotification(order);
    showAdmin();
    showAdminTab('orders');
    showNotification(`Pedido actualizado a: ${newStatus}`);
}

function renderConfigAdmin(content) {
    content.innerHTML = `
        <div class="max-w-3xl space-y-6">
            <div class="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <h3 class="text-xl font-bold mb-4">Información del Negocio</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold mb-2">Nombre del Negocio</label>
                        <input type="text" id="configBusinessName" value="${config.businessName}" class="input-field">
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-2">Título Principal</label>
                        <input type="text" id="configHeroTitle" value="${config.heroTitle}" class="input-field">
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-2">Descripción Principal</label>
                        <textarea id="configHeroDesc" rows="3" class="input-field">${config.heroDescription}</textarea>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <h3 class="text-xl font-bold mb-4">Redes Sociales</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold mb-2">Facebook</label>
                        <input type="url" id="configFacebook" value="${config.facebook}" class="input-field">
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-2">Instagram</label>
                        <input type="url" id="configInstagram" value="${config.instagram}" class="input-field">
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-2">WhatsApp</label>
                        <input type="url" id="configWhatsapp" value="${config.whatsapp}" class="input-field">
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <h3 class="text-xl font-bold mb-4">Información de Contacto</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold mb-2">Teléfono</label>
                        <input type="tel" id="configPhone" value="${config.phone}" class="input-field">
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-2">Email</label>
                        <input type="email" id="configEmail" value="${config.email}" class="input-field">
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-2">Dirección (usa &lt;br&gt; para saltos de línea)</label>
                        <input type="text" id="configAddress" value="${config.address.replace(/<br>/g, ' ')}" class="input-field">
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-2">Horario (usa &lt;br&gt; para saltos de línea)</label>
                        <input type="text" id="configSchedule" value="${config.schedule.replace(/<br>/g, ' ')}" class="input-field">
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <h3 class="text-xl font-bold mb-4">Métodos de Pago</h3>
                <div class="space-y-3">
                    <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-orange-50">
                        <input type="checkbox" id="configPaymentCash" ${config.paymentCash ? 'checked' : ''} class="w-5 h-5">
                        <span class="font-semibold">Aceptar Efectivo</span>
                    </label>
                    <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-orange-50">
                        <input type="checkbox" id="configPaymentCard" ${config.paymentCard ? 'checked' : ''} class="w-5 h-5">
                        <span class="font-semibold">Aceptar Tarjeta</span>
                    </label>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <h3 class="text-xl font-bold mb-4">Servicio a Domicilio</h3>
                <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-orange-50">
                    <input type="checkbox" id="configDelivery" ${config.delivery ? 'checked' : ''} class="w-5 h-5">
                    <span class="font-semibold">Activar Delivery</span>
                </label>
                <p class="text-sm text-gray-600 mt-3">Por ahora solo recoger en tienda está activo</p>
            </div>
            
            <div class="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <h3 class="text-xl font-bold mb-4">Inversión Inicial</h3>
                <div>
                    <label class="block text-sm font-bold mb-2">Monto invertido (para cálculo de ROI)</label>
                    <input type="number" id="configInvestment" value="${config.investment}" class="input-field">
                </div>
            </div>
            
            <button onclick="saveConfiguration()" class="btn-primary w-full py-4 text-lg">
                Guardar Toda la Configuración
            </button>
        </div>
    `;
}

function saveConfiguration() {
    config.businessName = document.getElementById('configBusinessName').value.trim();
    config.heroTitle = document.getElementById('configHeroTitle').value.trim();
    config.heroDescription = document.getElementById('configHeroDesc').value.trim();
    config.facebook = document.getElementById('configFacebook').value.trim();
    config.instagram = document.getElementById('configInstagram').value.trim();
    config.whatsapp = document.getElementById('configWhatsapp').value.trim();
    config.phone = document.getElementById('configPhone').value.trim();
    config.email = document.getElementById('configEmail').value.trim();
    config.address = document.getElementById('configAddress').value.trim().replace(/\s*<br>\s*/gi, '<br>');
    config.schedule = document.getElementById('configSchedule').value.trim().replace(/\s*<br>\s*/gi, '<br>');
    config.paymentCash = document.getElementById('configPaymentCash').checked;
    config.paymentCard = document.getElementById('configPaymentCard').checked;
    config.delivery = document.getElementById('configDelivery').checked;
    config.investment = parseInt(document.getElementById('configInvestment').value) || 0;
    
    saveConfig();
    updateBusinessInfo();
    updateSocialLinks();
    updateInfo();
    showNotification('¡Configuración guardada exitosamente!');
    
    // Actualizar el tab de dashboard
    showAdminTab('config');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}