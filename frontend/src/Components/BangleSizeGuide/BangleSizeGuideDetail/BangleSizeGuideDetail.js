import React from "react";
import "./../BangleSizeGuideDetail/BangleSizeGuideDetail.css";
import bangle1 from "./../../../Assets/bangle measuremnt 1.png";
import bangle2 from "./../../../Assets/bangle measurement 2.png";
function BangleSizeGuideDetail() {
  const bangleSizes = [
    { size: "2.2", inches: 2.125, mm: 54 },
    { size: "2.4", inches: 2.25, mm: 57.2 },
    { size: "2.6", inches: 2.375, mm: 60.3 },
    { size: "2.8", inches: 2.5, mm: 63.5 },
    { size: "2.1", inches: 2.625, mm: 66.7 },
    { size: "2.12", inches: 2.75, mm: 69.9 },
    { size: "2.14", inches: 2.875, mm: 73 },
    { size: "3", inches: 3, mm: 76.3 },
  ];

  return (
    <div className="main_div_bangle_sizeguide">
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="grey_div_banglesizeguide">
            <div className="d-flex justify-content-between">
              <img src={bangle1} className="bangle_style_icon1" />
              <img src={bangle2} className="bangle_style_icon2" />
            </div>
          </div>

          <div className="row m-0 p-0 mt-5">
            <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
            <div className="col-lg-8 col-md-10 col-sm-12 col-12">
              <table className="table table-bordered mt-5">
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Take a bangle that fits you perfectly.</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Measure the inner diameter.</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      Look up that diameter on this size chart to get your
                      correct bangle size.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>
                      Make sure you start measuring the bangle size from Point 0
                      on the scale or measuring tape.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          </div>

          <div className="row m-0 p-0 mt-5">
            <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
            <div className="col-lg-8 col-md-10 col-sm-12 col-12">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">BANGLE SIZE (INDIAN)</th>
                    <th scope="col">INCHES</th>
                    <th scope="col">MM</th>
                  </tr>
                </thead>
                <tbody>
                  {bangleSizes.map((size, index) => (
                    <tr key={index}>
                      <th scope="row">{size.size}</th>
                      <td>{size.inches}</td>
                      <td>{size.mm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default BangleSizeGuideDetail;
