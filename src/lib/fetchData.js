export const fetchData = async (data, url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    } else {
      const error = new Error(await response.text());
      throw error;
    }
  } catch (error) {
    throw error;
  }
};
