import React, { useState } from 'react';

const FilterComponent = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', number: 10 },
    { id: 2, name: 'Banana', number: 20 },
    { id: 3, name: 'Orange', number: 30 },
    { id: 4, name: 'Mango', number: 40 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.number.toString().includes(searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or number"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name} - {item.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterComponent;
