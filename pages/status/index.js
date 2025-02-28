import React from "react";
import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <ShowStatusData />
    </>
  );
}

function ShowStatusData() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let UpdatedAtText = "Carregando...";
  let DbVersion = "Carregando...";
  let MaxConn = "Carregando...";
  let OpenConn = "Carregando...";

  if (!isLoading && data) {
    UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    DbVersion = data.dependencies?.database?.version ?? "Não disponível";
    MaxConn = data.dependencies?.database?.max_connections ?? "Não disponível";
    OpenConn =
      data.dependencies?.database?.opened_connections ?? "Não disponível";
  }

  return (
    <div>
      <p>Última atualização: {UpdatedAtText}</p>
      <h2>Databse</h2>
      <p>Versão: {DbVersion}</p>
      <p>Conexões máximas: {MaxConn}</p>
      <p>Conexões abertas: {OpenConn}</p>
    </div>
  );
}
