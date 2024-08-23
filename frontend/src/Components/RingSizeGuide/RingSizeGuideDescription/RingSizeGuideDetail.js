import React from "react";
import "./../RingSizeGuideDescription/RingSizeGuideDescription.css";
import ringmeasurement from "./../../../Assets/ring measurement.png";

function RingSizeGuideDetail() {
  const ringSizes = [
    { us: 4.25, indian: 7, inches: 0.59, mm: 15.1 },
    { us: 4.5, indian: 8, inches: 0.6, mm: 15.3 },
    { us: 4.75, indian: 9, inches: 0.61, mm: 15.5 },
    { us: 5.25, indian: 10, inches: 0.62, mm: 15.7 },
    { us: 5.5, indian: 11, inches: 0.63, mm: 15.9 },
    { us: 5.75, indian: 12, inches: 0.64, mm: 16.1 },
    { us: 6.25, indian: 13, inches: 0.65, mm: 16.3 },
    { us: 6.5, indian: 14, inches: 0.66, mm: 16.5 },
    { us: 6.75, indian: 15, inches: 0.67, mm: 16.7 },
    { us: 7.25, indian: 16, inches: 0.68, mm: 16.9 },
    { us: 7.5, indian: 17, inches: 0.69, mm: 17.1 },
    { us: 7.75, indian: 18, inches: 0.7, mm: 17.3 },
    { us: 8.25, indian: 19, inches: 0.71, mm: 17.5 },
    { us: 8.5, indian: 20, inches: 0.72, mm: 17.7 },
    { us: 8.75, indian: 21, inches: 0.73, mm: 17.9 },
    { us: 9.25, indian: 22, inches: 0.74, mm: 18 },
    { us: 9.5, indian: 23, inches: 0.75, mm: 18.1 },
    { us: 9.75, indian: 24, inches: 0.76, mm: 18.3 },
    { us: 10.25, indian: 25, inches: 0.77, mm: 18.5 },
    { us: 10.5, indian: 26, inches: 0.78, mm: 18.7 },
    { us: 10.75, indian: 27, inches: 0.79, mm: 18.9 },
    { us: 11.25, indian: 28, inches: 0.8, mm: 19.1 },
    { us: 11.5, indian: 29, inches: 0.81, mm: 19.3 },
    { us: 11.75, indian: 30, inches: 0.82, mm: 19.5 }
  ];

  return (
    <div className="main-div_ringsizeguide">
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="d-flex justify-content-center">
            <img src={ringmeasurement} className="ring_measurement_style" alt="Ring Measurement"/>
          </div>
          <p className="para_measure">
            Measure the inside diameter of a ring that you already own in inches
            or millimeters and match it to the US or Indian ring size given in
            the chart below.
          </p>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">RING SIZE (US)</th>
                <th scope="col">INCHES</th>
                <th scope="col">RING SIZE (INDIAN)</th>
                <th scope="col">MM</th>
              </tr>
            </thead>
            <tbody>
              {ringSizes.map((size, index) => (
                <tr key={index}>
                  <th scope="row">{size.us}</th>
                  <td>{size.inches}</td>
                  <td>{size.indian}</td>
                  <td>{size.mm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default RingSizeGuideDetail;
