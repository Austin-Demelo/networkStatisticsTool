import { HttpMethod } from "../types/httpMethods";

export async function http<T>(path: string, method: HttpMethod = HttpMethod.GET, body?: any ): Promise<T> {
    const response = await fetch(path, 
        {
        method: method,
        mode: 'cors',
        headers: {"Content-Type" : "application/json"},
        body: body,
        }
    );
    const data = await response.json();
    return data;
  }

