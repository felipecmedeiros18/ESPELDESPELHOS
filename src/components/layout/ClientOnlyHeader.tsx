"use client";

import { useState, useEffect } from 'react';
import Header from './Header';

export default function ClientOnlyHeader() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <Header /> : <div className="h-20" />; // Placeholder to prevent layout shift
}
