async function loadProducts() {
  // fetch 오류 처리
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Network response was not ok");

    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Failed to load products", error);
  }
}

function displayProducts(products) {
  // Find the container where products will be displayed
  const container = document.querySelector("#all-products .container");
  const fragment = document.createDocumentFragment();

  // Iterate over each product and create the HTML structure safely
  products.forEach((product) => {
    // Create the main product div
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    // Create the product picture div
    const pictureDiv = document.createElement("div");
    pictureDiv.classList.add("product-picture");
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = `product: ${product.title}`;
    img.loading = "lazy"; // Lazy loading 적용
    img.width = 250;
    pictureDiv.appendChild(img);

    // Create the product info div
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("product-info");

    const category = document.createElement("h5");
    category.classList.add("categories");
    category.textContent = product.category;

    const title = document.createElement("h4");
    title.classList.add("title");
    title.textContent = product.title;

    const price = document.createElement("h3");
    price.classList.add("price");
    const priceSpan = document.createElement("span");
    priceSpan.textContent = `US$ ${product.price}`;
    price.appendChild(priceSpan);

    const button = document.createElement("button");
    button.textContent = "Add to bag";

    // Append elements to the product info div
    infoDiv.appendChild(category);
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    infoDiv.appendChild(button);

    // Append picture and info divs to the main product element
    productElement.appendChild(pictureDiv);
    productElement.appendChild(infoDiv);

    // 리플로우와 리페인트 줄이기
    fragment.appendChild(productElement);
  });

  // Append the new product element to the container
  container.appendChild(fragment);
}

loadProducts();

// Simulate heavy operation. It could be a complex price calculation.
// for (let i = 0; i < 10000000; i++) {
//   const temp = Math.sqrt(i) * Math.sqrt(i);
// }
window.onload = () => {
  let status = "idle";
  loadProducts();

  let productSection = document.querySelector("#all-products");

  // 무거운 작업을 chunk 단위로 나눠서 처리하는 함수
  function heavyOperationChunked(start = 0, chunkSize = 100000) {
    const end = start + chunkSize;
    for (let i = start; i < end && i < 10000000; i++) {
      const temp = Math.sqrt(i) * Math.sqrt(i);
    }

    if (end < 10000000) {
      // 다음 chunk 처리
      setTimeout(() => heavyOperationChunked(end, chunkSize), 0);
    } else {
      console.log("Heavy operation done!");
    }
  }

  // 초기 로드 시에도 무거운 작업 수행
  heavyOperationChunked();

  window.onscroll = () => {
    let position =
      productSection.getBoundingClientRect().top -
      (window.scrollY + window.innerHeight);

    if (status === "idle" && position <= 0) {
      status = "loading";
      loadProducts();

      // 스크롤에서 조건 만족 시에도 chunked 처리!
      heavyOperationChunked();
    }
  };
};
