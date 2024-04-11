import React from "react";

export default function Footer() {
  return (
    <div className="">
      <div className="mt-20 mx-auto border-t pt-10">
        <div className="text-center">
          <h3 className="text-2xl mb-5"> Download Mobile App</h3>
          {/* <p> Stay fit. All day, every day. </p> */}
          <div className="flex justify-center">
            <div className="flex items-center border rounded-lg px-4 py-2 mx-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                className="w-7 md:w-8"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-500">Download on </p>
                <p className="text-sm md:text-base"> Google Play Store </p>
              </div>
            </div>
            <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                className="w-7 md:w-8"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-500">Download on </p>
                <p className="text-sm md:text-base"> Apple Store </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 items-center text-sm text-gray-800">
          <p className="order-2 md:order-1 text-center mt-8 md:mt-0">
            Copyright &copy; 2024. All right reserved.
          </p>
          {/* <div className="order-1 md:order-2">
            <span className="px-2">About us</span>
            <span className="px-2 border-l">Contact us</span>
            <span className="px-2 border-l">Privacy Policy</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
