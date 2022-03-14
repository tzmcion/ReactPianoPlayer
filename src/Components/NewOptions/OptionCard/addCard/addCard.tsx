import React from 'react';
import './addCard.styles.scss';

interface props{
    type: 'add' | 'delete'
    onClick: () => void;
}

export default function addCard({type,onClick}:props):React.ReactElement {
  return (
    <div className="add-card" onClick={onClick} title={type === 'add' ? 'add' : 'delete'}><p style={{color:type==='add' ? 'green':'red'}}>{type === 'add' ? '+' : '-'}</p></div>
  )
}
