export async function apiRequest(
  endpoint,
  { method = "GET", body, token, headers = {}, isFormData = false } = {}
) {
  const baseUrl = "https://warehousesys-production.up.railway.app";

  // ✅ Safely join baseUrl + endpoint
  const url = `${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  // ✅ Prepare headers
  const finalHeaders = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers,
  };

  if (!isFormData) {
    finalHeaders["Content-Type"] = "application/json";
  }

  try {
    console.log(`[apiRequest] → ${method} ${url}`, body || "(no body)");

    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[apiRequest] ❌ Failed: ${res.status} ${errorText}`);
      throw new Error(`Request failed (${res.status}): ${errorText}`);
    }

    const data = await res.json();
    console.log(`[apiRequest] ✅ Success:`, data);
    return data;
  } catch (error) {
    console.error(`[apiRequest] 🚨 Fetch error:`, error.message);
    throw error;
  }
}
