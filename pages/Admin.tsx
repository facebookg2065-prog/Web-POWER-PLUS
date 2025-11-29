import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { Edit, Trash2, Plus, X, Save, Image as ImageIcon, Users } from 'lucide-react';

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct({
      id: Date.now(),
      name: '',
      price: 0,
      category: 'Rifle',
      image: 'https://picsum.photos/id/10/600/400',
      description: '',
      owner: 'Admin'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const existingIndex = products.findIndex(p => p.id === editingProduct.id);
    
    if (existingIndex >= 0) {
      const updatedProducts = [...products];
      updatedProducts[existingIndex] = editingProduct as Product;
      setProducts(updatedProducts);
    } else {
      setProducts([editingProduct as Product, ...products]);
    }

    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setEditingProduct(prev => prev ? ({ ...prev, [field]: value }) : null);
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-6 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-white mb-2">لوحة التحكم</h1>
           <p className="text-gray-400 text-sm">إدارة المنتجات والمستخدمين</p>
        </div>
        
        <div className="flex gap-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-5 py-2 rounded-lg flex items-center gap-2 transition-colors border border-gray-700">
                <Users size={18} />
                <span>المستخدمين</span>
            </button>
            <button 
            onClick={handleAddNew}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 font-bold transition-colors shadow-lg shadow-green-900/20"
            >
            <Plus size={18} /> إضافة إعلان
            </button>
        </div>
      </div>

      {/* Stats Cards (Optional visual flair based on 'Admin' feel) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface p-4 rounded-lg border border-gray-800 flex justify-between items-center">
             <div>
                 <div className="text-gray-400 text-sm">إجمالي الإعلانات</div>
                 <div className="text-2xl font-bold text-white">{products.length}</div>
             </div>
             <div className="bg-primary/10 p-2 rounded-full text-primary"><ImageIcon size={24} /></div>
        </div>
        <div className="bg-surface p-4 rounded-lg border border-gray-800 flex justify-between items-center">
             <div>
                 <div className="text-gray-400 text-sm">إجمالي المستخدمين</div>
                 <div className="text-2xl font-bold text-white">1,204</div>
             </div>
             <div className="bg-blue-500/10 p-2 rounded-full text-blue-500"><Users size={24} /></div>
        </div>
        <div className="bg-surface p-4 rounded-lg border border-gray-800 flex justify-between items-center">
             <div>
                 <div className="text-gray-400 text-sm">المبيعات</div>
                 <div className="text-2xl font-bold text-white">$45,200</div>
             </div>
             <div className="bg-green-500/10 p-2 rounded-full text-green-500"><Plus size={24} /></div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-surface border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right min-w-[800px]">
            <thead>
              <tr className="bg-[#111] border-b border-gray-800 text-gray-400">
                <th className="p-4 font-medium w-16">#</th>
                <th className="p-4 font-medium w-32">الصورة</th>
                <th className="p-4 font-medium">اسم السلاح</th>
                <th className="p-4 font-medium">السعر</th>
                <th className="p-4 font-medium">صاحب الإعلان</th>
                <th className="p-4 font-medium text-center w-48">العمليات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="p-4 text-gray-500 font-mono text-sm">{index + 1}</td>
                  <td className="p-4">
                    <img src={product.image} alt={product.name} className="w-20 h-14 object-cover rounded border border-gray-700" />
                  </td>
                  <td className="p-4 font-bold text-white">
                      {product.name}
                      <div className="text-xs text-gray-500 font-normal mt-1">{product.category}</div>
                  </td>
                  <td className="p-4 text-primary font-bold">${product.price}</td>
                  <td className="p-4 text-gray-300 text-sm">
                    {product.owner || 'Admin'}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1.5 bg-[#007bff] hover:bg-blue-600 text-white rounded text-sm transition-colors flex items-center gap-1"
                      >
                        <Edit size={14} /> تعديل
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1.5 bg-[#d60000] hover:bg-red-700 text-white rounded text-sm transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={14} /> حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
            <div className="p-8 text-center text-gray-500">
                لا توجد إعلانات حالياً
            </div>
        )}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-surface w-full max-w-lg rounded-2xl border border-gray-700 shadow-2xl p-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              {editingProduct.id && products.some(p => p.id === editingProduct.id) ? 'تعديل الإعلان' : 'إضافة إعلان جديد'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">اسم المنتج</label>
                <input 
                  type="text" 
                  value={editingProduct.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">السعر ($)</label>
                  <input 
                    type="number" 
                    value={editingProduct.price}
                    onChange={(e) => handleInputChange('price', Number(e.target.value))}
                    className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">صاحب الإعلان</label>
                    <input 
                        type="text"
                        value={editingProduct.owner || 'Admin'}
                        onChange={(e) => handleInputChange('owner', e.target.value)}
                        className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                    />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">التصنيف</label>
                <select 
                    value={editingProduct.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                >
                    <option value="Rifle">Rifle</option>
                    <option value="Pistol">Pistol</option>
                    <option value="Shotgun">Shotgun</option>
                    <option value="Sniper">Sniper</option>
                    <option value="Gear">Gear</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">الوصف</label>
                <textarea 
                  value={editingProduct.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 p-3 bg-dark/50 rounded-lg border border-gray-800 text-sm text-gray-400">
                <ImageIcon size={16} />
                <span>سيتم استخدام صورة افتراضية: {editingProduct.image?.substring(0, 30)}...</span>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mt-4">
                <Save size={18} /> حفظ
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;