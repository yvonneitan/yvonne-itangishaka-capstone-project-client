import React from 'react'

export default function CardsContainer() {
  return (
    <div className={`lists ${className}`}>
        <p className="lists__title">{title}</p>
        <div className="lists__content">
            {children}
        </div>
    </div>
);
}