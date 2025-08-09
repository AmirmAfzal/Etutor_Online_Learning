const StudentCheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-base-100 flex w-full flex-col items-center justify-center pb-16">
      <div className="bg-base-200 flex h-32 w-full flex-col items-center justify-center gap-3">
        <h4 className="text-base-content/80 text-xl font-semibold">Checkout</h4>
        <span className="text-base-content/70 text-sm">
          Home/ShopingCard/Checkout
        </span>
      </div>
      <div className="mt-10 w-full max-w-5xl">{children}</div>
    </div>
  );
};

export default StudentCheckoutLayout;
