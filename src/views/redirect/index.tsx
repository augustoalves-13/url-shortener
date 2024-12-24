'use client'

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const RedirectApp = () => {
  const { short } = useParams<{ short: string }>(); 
  const [originalUrl, setOriginalUrl] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await fetch(`/api/shorten/${short}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();

        if (response.ok) {
          setOriginalUrl(data.original_url); 
        } else {
          setError(data.error); 
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to fetch URL');
      } finally {
        setLoading(false); 
      }
    };

    if (short) {
      fetchOriginalUrl();
    }
  }, [short]); 

  useEffect(() => {
    if (originalUrl) {
      window.location.replace(originalUrl);
    }
  }, [originalUrl]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null; 
};

export default RedirectApp;
