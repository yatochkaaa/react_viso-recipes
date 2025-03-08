export function useWishlist() {
  const addToWishlist = (id: string) => {
    const wishlist = localStorage.getItem("wishlist");
    if (wishlist) {
      let parsedWishlist = JSON.parse(wishlist);

      if (wishlist.includes(id)) {
        parsedWishlist = parsedWishlist.filter(
          (itemId: string) => itemId !== id
        );
      } else {
        parsedWishlist.push(id);
      }
      localStorage.setItem("wishlist", JSON.stringify(parsedWishlist));
    } else {
      localStorage.setItem("wishlist", JSON.stringify([id]));
    }
  };

  const isAddedToWishlist = (id: string) => {
    const wishlist = localStorage.getItem("wishlist");

    if (wishlist) {
      let parsedWishlist = JSON.parse(wishlist);
      console.log(parsedWishlist);
      return parsedWishlist && parsedWishlist.includes(id);
    }

    return false;
  };

  return { addToWishlist, isAddedToWishlist };
}
