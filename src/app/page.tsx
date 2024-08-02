"use client";
import pageStyles from "./page.module.css";
import styles from "./styles.module.css";
import { ModernInvoiceTemplate } from "./components/ModernInvoiceTemplate";
import { MinimumInvoiceTemplate } from "./components/MinimumInvoiceTemplate";
import { CompactInvoiceTemplate } from "./components/CompactInvoiceTemplate";
import { MuiColorInput } from "mui-color-input";
import localFont from "next/font/local";
import {
  MdOutlineFeed,
  MdChevronRight,
  MdImage,
  MdOutlineDocumentScanner,
  MdOutlineAdd,
} from "react-icons/md";
import {
  Barlow,
  Quicksand,
  Albert_Sans,
  Roboto,
  Raleway,
} from "next/font/google";
import { useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "300", "900"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "300", "900"],
});
const alberSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "300", "900"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "700", "300"],
});

// const myFont = localFont({ src: "./fonts/SFPRODISPLAYSEMIBOLDITALIC.OTF" });

export default function Home() {
  const [customization, setCustomization] = useState({
    backgroundColor: "#fff",
    fontColor: "#000",
    invoiceFormat: "modern",
    fontstyle: raleway,
  });
  const [selectedImage, setSelectedImage] = useState("");
  const [services, setServices] = useState([
    { service: "", rate: 0, price: 0, quantity: 0 },
  ]);
  const [userInfo, setUserInfo] = useState({
    address: "",
    businessname: "",
    terms: "",
    bankname: "",
    accountnumber: "",
    accountname: "",
  });
  const handleFileUploadTrigger = () => {
    document.getElementById("file-upload-id")?.click();
  };

  const handleAddServiceLine = () => {
    const uncompletedServices = services.filter(
      (el) => !el.service || !el.price || !el.quantity || !el.rate
    );
    if (uncompletedServices.length)
      return toast.error("Complete any unfinished service row");
    setServices([...services, { service: "", rate: 0, price: 0, quantity: 0 }]);
  };

  const handleChangeServiceInput = (id: string, value: number, key: number) => {
    services[key] = { ...services[key], [id]: value };
    setServices([...services]);
  };

  const total = useMemo(
    () => services.reduce((acc, curr) => acc + curr.quantity * curr.rate, 0),
    [services]
  );

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleValidateInputFields = () => {
    console.log("i am hwrw");
    console.log("dfs", userInfo.businessname);
    if (!userInfo.businessname) return toast.error("Input Business Name");
    if (!userInfo.address) return toast.error("Input Business Address");
    if (!userInfo.bankname) return toast.error("Input Business Bank Name");
    if (!userInfo.accountnumber)
      return toast.error("Input Business Account Number");
  };

  const handleSaveInvoiceDraft = () => {
    handleValidateInputFields();
  };

  return (
    <main className={(pageStyles.main, roboto.className)}>
      <div className={styles["navbar-container"]}>
        <div className='row'>
          <div className={styles.header}>
            <div className={styles.menu}>
              <p>
                <MdOutlineFeed /> Invoices{" "}
              </p>
              <MdChevronRight />
              <p>Create Invoice</p>
            </div>
            <div className={styles.actions}>
              {/* <button>Preview</button> */}
              <button onClick={handleSaveInvoiceDraft}>Save as Draft</button>
              <button>Download Invoice</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["invoice-create-container"]}>
        <div className='row'>
          <div className='col-1'></div>
          <div className='col-10'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-6'>
                  <div className={styles["invoice-create-body-container"]}>
                    <div className='row'>
                      <div className='col-8'>
                        <h2>Create a new invoice</h2>
                        <div className={styles["input-div"]}>
                          <label>Business Name</label>
                          <input
                            placeholder='Seleforce Motors'
                            onChange={({ target: { value } }) =>
                              setUserInfo({ ...userInfo, businessname: value })
                            }
                          />
                        </div>
                        <div className='row'>
                          <div className='col'>
                            <div className={styles["input-div"]}>
                              <label>Address</label>
                              <input
                                placeholder='No 2, Oduwole Street'
                                onChange={({ target: { value } }) =>
                                  setUserInfo({
                                    ...userInfo,
                                    address: value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-4'>
                        {selectedImage ? (
                          <div className={styles["uploaded-image-container"]}>
                            <Image
                              src={selectedImage || ""}
                              width={200}
                              height={180}
                              alt='brand-logo'
                            />
                            <button onClick={handleFileUploadTrigger}>
                              Change Photo
                            </button>
                            <input
                              type='file'
                              id='file-upload-id'
                              style={{ display: "none" }}
                              onChange={handleFileUpload}
                            />
                          </div>
                        ) : (
                          <div
                            className={styles["logo-upload-container"]}
                            onClick={handleFileUploadTrigger}
                          >
                            <input
                              type='file'
                              id='file-upload-id'
                              onClick={handleFileUploadTrigger}
                              onChange={handleFileUpload}
                            />
                            <MdImage />
                            <p>Add Logo</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles["invoice-services"]}>
                      <h4>Services</h4>
                      {services.map((el, key) => (
                        <div key={key}>
                          <input
                            placeholder='Service Name'
                            onChange={({ target: { value } }) =>
                              handleChangeServiceInput("service", value, key)
                            }
                          />
                          <input
                            placeholder='Rate ($/Quantity)'
                            type='number'
                            onChange={({ target: { value } }) =>
                              handleChangeServiceInput(
                                "rate",
                                Number(value),
                                key
                              )
                            }
                          />
                          <input
                            placeholder='Quantity'
                            type='number'
                            onChange={({ target: { value } }) =>
                              handleChangeServiceInput(
                                "quantity",
                                Number(value),
                                key
                              )
                            }
                          />
                          <input
                            placeholder='0.00'
                            disabled
                            value={Number(el.quantity) * Number(el.rate)}
                          />
                        </div>
                      ))}
                      <button onClick={handleAddServiceLine}>
                        Add New Line <MdOutlineAdd />
                      </button>
                    </div>
                    <textarea
                      placeholder='Terms'
                      onChange={({ target: { value } }) =>
                        setUserInfo({ ...userInfo, terms: value })
                      }
                    />
                    <br />
                    <div className={styles["input-div"]}>
                      <label>Pay To</label>
                      <div className={styles["flex"]}>
                        <input
                          placeholder='Bank Name'
                          onChange={({ target: { value } }) =>
                            setUserInfo({ ...userInfo, bankname: value })
                          }
                        />
                        <input
                          placeholder='Account Number'
                          onChange={({ target: { value } }) =>
                            setUserInfo({ ...userInfo, accountnumber: value })
                          }
                        />
                        <input
                          placeholder='Account Name'
                          onChange={({ target: { value } }) =>
                            setUserInfo({ ...userInfo, accountname: value })
                          }
                        />
                      </div>
                    </div>
                    <div className={styles["customization"]}>
                      <h4>Customization Options</h4>
                      <div className={styles["input-div"]}>
                        <label>Format</label>
                        <select
                          className='form-select'
                          value={customization.invoiceFormat}
                          onChange={({ target: { value } }) =>
                            setCustomization({
                              ...customization,
                              invoiceFormat: value,
                            })
                          }
                        >
                          <option disabled defaultValue={"minimal"}>
                            Select Invoice Format
                          </option>
                          <option value={"minimal"}>Minimal Invoice</option>
                          <option value={"modern"}>Modern Invoice</option>
                          <option value={"compact"}>Compact Invoice</option>
                        </select>
                      </div>
                      <div className='row'>
                        <div className='col-6'>
                          <div className={styles["input-div"]}>
                            <label>Background Color</label>
                            <MuiColorInput
                              format='hex'
                              value={customization.backgroundColor}
                              onChange={(color) =>
                                setCustomization({
                                  ...customization,
                                  backgroundColor: color,
                                })
                              }
                              className={styles["color-input"]}
                            />
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className={styles["input-div"]}>
                            <label>Font Color</label>
                            <MuiColorInput
                              format='hex'
                              value={customization.fontColor}
                              onChange={(color) =>
                                setCustomization({
                                  ...customization,
                                  fontColor: color,
                                })
                              }
                              className={styles["color-input"]}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles["input-div"]}>
                        <label>Font Style</label>
                        <select
                          className='form-select'
                          value={`${customization.fontstyle}`}
                          onChange={({ target: { value } }) => {
                            let font = customization.fontstyle;
                            if (value === "roboto") font = roboto;
                            if (value === "albertSans") font = alberSans;
                            if (value === "raleway") font = raleway;
                            if (value === "quicksand") font = quicksand;
                            setCustomization({
                              ...customization,
                              fontstyle: font,
                            });
                          }}
                        >
                          <option disabled defaultValue={"Select Font Style"}>
                            Select Font Style
                          </option>
                          <option value={"raleway"}>Raleway</option>
                          <option value={"albertSans"}>Albert Sans</option>
                          <option value={"roboto"}>Roboto</option>
                          <option value={"quicksand"}>QuickSand</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className={styles["invoice-body-styles-container"]}>
                    <div className={styles["preview-header"]}>
                      <h3>Preview</h3>
                      <div className={styles["actions"]}>
                        <button>
                          <MdOutlineDocumentScanner />
                          PDF
                        </button>
                        <button>Email</button>
                      </div>
                    </div>
                    <div className={styles["preview-container"]}>
                      <div
                        className={styles["preview-document"]}
                        style={{
                          background: customization.backgroundColor,
                        }}
                      >
                        <div
                          className={customization.fontstyle.className}
                          style={{ height: "100%" }}
                        >
                          {customization.invoiceFormat === "modern" ? (
                            <ModernInvoiceTemplate
                              services={services}
                              total={total}
                              userInfo={userInfo}
                              customization={customization}
                              image={selectedImage}
                            />
                          ) : customization.invoiceFormat === "minimal" ? (
                            <MinimumInvoiceTemplate
                              services={services}
                              total={total}
                              userInfo={userInfo}
                              customization={customization}
                              image={selectedImage}
                            />
                          ) : (
                            <CompactInvoiceTemplate
                              services={services}
                              total={total}
                              image={selectedImage}
                              userInfo={userInfo}
                              customization={customization}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-1'></div>
        </div>
      </div>
    </main>
  );
}
