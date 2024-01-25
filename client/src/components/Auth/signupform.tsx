import React, { useEffect, useState } from "react";
import Icons from "../icons";
import { useAuth } from "../../hooks/useAuth";
import { errorByKey } from "../../helper";
import Autocomplete from "react-autocomplete";

type City = {
  city: string;
  country: string;
};

const SignUpForm = ({
  setshowScreen,
  className = "",
  signUpFormData,
  handleFormChange,
  changeLocation,
  signUpFormErrors,
  setSignUpFormErrors,
  setErrorMessage,
}: // setlocation,
{
  setshowScreen: any;
  className?: string;
  signUpFormData: any;
  changeLocation: any;
  handleFormChange: any;
  signUpFormErrors: any;
  setSignUpFormErrors: any;
  setErrorMessage: any;
}) => {
  const [isAgree, setisAgree] = useState(false);
  
  const [birthClicked, setBirthClicked] = useState(false);
  const { signup } = useAuth();
  const [hasError, setHasError] = useState("");
  const [cities, setCities] = useState<City[]>([
    { country: "US", city: "United State" },
    { country: "SA", city: "Saudi Arabia" },
  ]);

  const [tcities, setTcities] = useState<City[]>([
    { country: "US", city: "United State" },
    { country: "SA", city: "Saudi Arabia" },
  ]);

  const filterCities = (value: string): City[] => {
    return cities.filter((city) =>
      city.city.toLowerCase().includes(value.toLowerCase())
    );
  };

  const showError = (key: any) => {
    return hasError === key;
  };

  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const [value, setValue] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log("Latitude: " + latitude + ", Longitude: " + longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const apiKey = "65abd1a065754357318494tyqfc0f56";

  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          // const city = data.results[0].components.city;
          setCity(data.address.state);
          setCountry(data.address.country);
          setValue(data.address.state);
          changeLocation(data.address.state);
        })
        .catch((error) => {
          console.error("Error fetching city data:", error);
        });
    }
  }, [latitude, longitude]);

  const apiUrl = "https://example.com/api";
  const headers = new Headers({
    // 'X-Api-Key': "t4APiNfoXUlQeSUGP3gSAg==nwlWPq7fLlYIOiEx"
    accept: "application/json",
  });
  // https://api.api-ninjas.com/v1/city?name=San
  useEffect(() => {
    fetch(
      "https://api.openaq.org/v2/cities?limit=2430&page=1&offset=0&sort=asc&order_by=city",
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => setCities(data.results));
  }, []);

  useEffect(() => {
    if (errorByKey(signUpFormErrors, "birth_date")) {
      setHasError("birth_date");
      setErrorMessage(errorByKey(signUpFormErrors, "birth_date"));
    } else if (errorByKey(signUpFormErrors, "location")) {
      setHasError("location");
      setErrorMessage(errorByKey(signUpFormErrors, "location"));
    } else if (errorByKey(signUpFormErrors, "company_name")) {
      setHasError("company_name");
      setErrorMessage(errorByKey(signUpFormErrors, "company_name"));
    } else {
      setHasError("");
      setErrorMessage("");
    }
  }, [signUpFormErrors]);

  // const handleBirthayClcik = (e:HTMLDivElement) => {

  //   const _node: HTMLInputElement | null = e?.currentTarget?.querySelector('input[name="birth_date"]');
  //   if (_node) {
  //     _node.focus();
  //   }

  // }
  const handleContinue = () => {
    if (typeof setErrorMessage === "function") {
      if (!signUpFormData?.birth_date?.length) {
        setHasError("birth_date");
        setErrorMessage("You must enter a Date of Birth");
      } else if (!signUpFormData?.location?.length) {
        setHasError("location");
        setErrorMessage("You must enter a Location");
      } else if (!signUpFormData?.company_name?.length) {
        setHasError("company_name");
        setErrorMessage("You must enter a Company");
      } else if (signUpFormData?.company_name?.length < 3) {
        setHasError("company_name");
        setErrorMessage("Company must have a minimum of 3 letters");
      } else {
        submit();
      }
    } else {
      submit();
    }
  };

  const submit = () => {
    setHasError("");
    setSignUpFormErrors([]);
    setErrorMessage("");

    const data = { ...signUpFormData };
    const parts = data.birth_date.split("|").map((d: any) => d.trim());
    data.birth_date = `${parts[1]}-${parts[0]}-${parts[2]}`;

    signup(data)
      .then((res) => {
        setshowScreen(4);
      })
      .catch((err) => {
        if (err?.response?.data?.message?.length) {
          if (Array.isArray(err.response.data.message)) {
            setSignUpFormErrors(err.response.data.message);
          } else {
            setErrorMessage(err.response.data.message);
          }
          setshowScreen(1);
        }
      });
  };

  return (
    <div className={`kjjfds-janwkea ${className}`}>
      <div className="wave-box">
        {/* <div className='wave'></div> */}
        <video
          className="bg-video"
          src={"/assets/blue_bg.mp4"}
          autoPlay
          loop
          muted
          style={{ height: "auto" }}
        ></video>
      </div>
      <div
        className="jhjij-sanwe"
        style={{
          height: "100%",
          justifyContent: "space-between",
          marginTop: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 0,
            paddingTop: 100,
          }}
        >
          <h3
            style={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "19px",
              letterSpacing: "0.6000000238418579px",
              textAlign: "center",
            }}
          >
            Some final details...
          </h3>
          <h4
            style={{
              fontFamily: "HK Grotesk",
              fontSize: 12,
              fontWeight: 500,
              lineHeight: "28px",
              letterSpacing: 0,
              textAlign: "center",
              color: "#fff",
            }}
          >
            If you don’t have a company, just leave it blank
          </h4>

          <div className="njskakd-kawmed">
            <div className="emailRowDiv sadhasdn-we signupFinelDetail">
              <div
                className={`jksd-kosaeknae ${
                  showError("birth_date") ? "error-border" : ""
                }`}
                style={{ cursor: "text" }}
                onClick={(e) => {
                  const _node: HTMLInputElement | null =
                    e?.currentTarget?.querySelector('input[name="birth_date"]');
                  if (_node) {
                    _node.focus();
                  }
                  setBirthClicked(true);
                }}
              >
                <Icons iconNumber={58} />
                <input
                  placeholder={
                    birthClicked ? "DD   |    MM    |   YYYY" : "Birth Date"
                  }
                  name="birth_date"
                  onClick={() => setBirthClicked(true)}
                  onBlur={() => setBirthClicked(false)}
                  onChange={handleFormChange}
                  value={signUpFormData?.birth_date}
                  autoComplete="off"
                  style={{ flex: 1 }}
                />
              </div>
              <div
                className={`jksd-kosaeknae ${
                  showError("location") ? "error-border" : ""
                }`}
                style={{ cursor: "text" }}
                onClick={(e) => {
                  const _node: HTMLInputElement | null =
                    e?.currentTarget?.querySelector('input[name="location"]');
                  if (_node) {
                    _node.focus();
                  }
                }}
              >
                <Icons iconNumber={12} />
                {/* <input
                  placeholder="Location"
                  name="location"
                  onChange={handleFormChange}
                  autoComplete="off"
                  style={{ flex: 1 }}
                /> */}
                <div style={{ left: "10px", top: "280px" }}>
                  <Autocomplete
                    inputProps={{
                      style: {
                        width: "100%",
                        height: "100px",
                        left: "10px",
                        top: "280px",
                      },
                      placeholder: `${city}, ${country}`,
                    }}
                    wrapperStyle={{
                      width: "100%",
                      left: "10px",
                      top: "280px",
                      zIndex: 10,
                    }}
                    getItemValue={(item: City) => item.city}
                    menuStyle={{
                      backgroundColor: "white",
                      borderRadius: 5,
                      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                      zIndex: 1000,
                    }}
                    items={filterCities(value)}
                    renderItem={(item: City, isHighlighted: boolean) => (
                      <div
                        style={{
                          background: isHighlighted ? "lightgray" : "white",
                        }}
                      >
                        {item.city}
                      </div>
                    )}
                    value={value}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>,
                      value: string
                    ) => {
                      setValue(value);
                      changeLocation(value);
                    }}
                    onSelect={(value: string) => {
                      setValue(value);
                      changeLocation(value);
                    }}
                  />
                  {/* <Icons iconNumber={12} />
                <input placeholder="Location" name='location' onChange={handleFormChange} autoComplete="off" style={{ flex: 1 }} /> */}
                </div>
              </div>
              <div
                className={`jksd-kosaeknae ${
                  showError("company_name") ? "error-border" : ""
                }`}
                style={{ cursor: "text" }}
                onClick={(e) => {
                  const _node: HTMLInputElement | null =
                    e?.currentTarget?.querySelector(
                      'input[name="company_name"]'
                    );
                  if (_node) {
                    _node.focus();
                  }
                }}
              >
                <Icons iconNumber={13} />
                <input
                  placeholder="Company"
                  name="company_name"
                  onChange={handleFormChange}
                  autoComplete="off"
                  style={{ flex: 1 }}
                />
              </div>
            </div>
            <div className="jdaskfjnas-ajaied">
              <div
                onClick={() => {
                  setisAgree(!isAgree);
                }}
                className={` sandka-jwe ansks-adn ${
                  isAgree == true ? "asfajea0dwnmd" : ""
                }`}
              >
                <Icons iconNumber={isAgree ? 75 : 14} />
                <h5>Remember me</h5>
              </div>
              <div className="ansks-adn">
                <button
                  onClick={() => {
                    setshowScreen(0);
                  }}
                  className="no-shadow"
                >
                  Log in
                </button>
              </div>
            </div>

            <div
              className="continueBtnDiv snasdj-sawdne"
              style={{ zIndex: -1 }}
            >
              <button onClick={handleContinue} className="btn kjlsjadm-kdmsd-2">
                COMPLETE SIGNUP
                <Icons iconNumber={94} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="ldkjfal0-fdsnfe">
        <Icons iconNumber={64} />
      </div>
    </div>
  );
};

export default SignUpForm;
