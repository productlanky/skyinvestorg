export async function fetchTeslaPrice() {
  const apiKey = "3d3ef5b8ef164f359687f7081be8d524";
  const res = await fetch(
    `https://api.twelvedata.com/price?symbol=TSLA&apikey=${apiKey}`
  );
  const data = await res.json();
  return data.price;
}
