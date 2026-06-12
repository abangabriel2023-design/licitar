import api from "@/lib/api";
import type { Licitacion, PaginatedResponse } from "@/types";

export interface LicitacionFiltros {
  search?: string;
  estado?: string;
  provincia?: string;
  rubro?: string;
  page?: number;
}

export const getLicitaciones = async (filtros: LicitacionFiltros = {}): Promise<PaginatedResponse<Licitacion>> => {
  const { data } = await api.get("/licitaciones/", { params: filtros });
  return data;
};

export const getLicitacion = async (id: number): Promise<Licitacion> => {
  const { data } = await api.get(`/licitaciones/${id}/`);
  return data;
};

export const agregarFavorito = async (licitacionId: number) => {
  return api.post("/licitaciones/favoritos/", {
    licitacion_id: licitacionId,
  });
};