"use client";

import { Button, Card, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { FormEvent, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortened, setShortened] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ original_url: originalUrl }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      alert(`Erro: ${errorData}`);
      return;
    }

    try {
      const data = await res.json();
      setShortened(`${window.location.origin}/${data.shorted_url}`);
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível completar a operação");
    }
  };

  return (
    <div>
      <Card sx={{ padding: 3 }}>
        <div className="flex gap-2 items-center">
          <TextField
            label="URL"
            placeholder="Cole aqui a URL"
            onChange={(e) => setOriginalUrl(e.target.value)}
            value={originalUrl}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ height: "100%" }}
          >
            Encurtar
          </Button>
        </div>
      </Card>
      {shortened && (
        <Card sx={{ marginTop: 2, padding: 3, display: 'flex', alignItems: 'center', gap: 2}}>
           <QRCode
              value={shortened}
              style={{padding: 12, background: '#fff', borderRadius: 12}}
           />
          <Typography variant="h5" sx={{ wordBreak: "break-all" }}>
            Link encurtado:{" "}
            <Link
              href={shortened}
              target="_blank"
              style={{ color: "primary.main", textDecoration: "underline" }}
            >
              {shortened}
            </Link>
          </Typography>
        </Card>
      )}
    </div>
  );
};

export default App;
