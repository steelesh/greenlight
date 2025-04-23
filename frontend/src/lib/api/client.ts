import createClient from "openapi-fetch";

import type { components, paths } from "./types";

export const apiClient = createClient<paths>({
  baseUrl: "/v1",
});

export function getHealthcheck() {
  return apiClient.GET("/healthcheck");
}

export function listMovies(params?: {
  title?: string;
  genres?: string[];
  page?: number;
  page_size?: number;
  sort?: "id" | "title" | "year" | "runtime" | "-id" | "-title" | "-year" | "-runtime";
}) {
  return apiClient.GET("/movies", { params: { query: params } });
}

export function createMovie(data: components["schemas"]["CreateMovieRequest"]) {
  return apiClient.POST("/movies", { body: data });
}

export function getMovie(id: number) {
  return apiClient.GET(`/movies/{id}`, { params: { path: { id } } });
}

export function updateMovie(id: number, data: components["schemas"]["UpdateMovieRequest"]) {
  return apiClient.PATCH(`/movies/{id}`, { params: { path: { id } }, body: data });
}

export function deleteMovie(id: number) {
  return apiClient.DELETE(`/movies/{id}`, { params: { path: { id } } });
}

export function registerUser(data: components["schemas"]["CreateUserRequest"]) {
  return apiClient.POST("/users", { body: data });
}

export function activateUser(data: components["schemas"]["ActivateUserRequest"]) {
  return apiClient.PUT("/users/activated", { body: data });
}

export function createAuthToken(data: components["schemas"]["AuthenticationTokenRequest"]) {
  return apiClient.POST("/tokens/authentication", { body: data });
}
