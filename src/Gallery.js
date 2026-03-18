import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function Gallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data } = await supabase.from('furniture').select('*');
    setItems(data);
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
      {items.map(item => (
        <div key={item.id}>
          <img src={item.image_url} alt={item.name} style={{ width: '200px' }} />
          <h3>{item.name}</h3>
          <p>Rs. {item.price}</p>
        </div>
      ))}
    </div>
  );
}
