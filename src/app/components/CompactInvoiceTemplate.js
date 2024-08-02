"use client";

import Image from "next/image";
import styles from "../styles.module.css";

export function CompactInvoiceTemplate({
  services,
  total,
  userInfo,
  customization,
  image,
}) {
  return (
    <div className={styles["compact-invoice"]}>
      <div className={styles["logo-container"]}>
        <Image src={image} alt='brand-logo' width={50} height={50} />
        <h4
          className={styles["invoiceId"]}
          style={{ color: customization.fontColor }}
        >
          Invoice #32023A
        </h4>
      </div>
      <div
        className={styles["body"]}
        style={{ color: customization.fontColor }}
      >
        <div className={styles["invoice-user-details"]}>
          <div className=''>
            <h6 style={{ color: customization.fontColor }}>
              {userInfo?.businessname || "-"}
            </h6>
            <p style={{ color: customization.fontColor }}>
              {userInfo?.address || "-"}
            </p>
            <p style={{ color: customization.fontColor }}>0811293483</p>
          </div>
          <div className=''>
            <div className={styles["top-right-details"]}>
              <p style={{ color: customization.fontColor }}>Issued On</p>
              <p style={{ color: customization.fontColor }}>23th Nov, 2023</p>
            </div>
            <div className={styles["top-right-details"]}>
              <p style={{ color: customization.fontColor }}>Due On</p>
              <p style={{ color: customization.fontColor }}>23th Nov, 2023</p>
            </div>
          </div>
        </div>
        <div className={styles["invoice-content"]}>
          <table className='table'>
            <thead>
              <th>Description</th>
              <th>Rate</th>
              <th>Quantity</th>
              <th>Price</th>
            </thead>
            <tbody>
              {services.map((el, key) => (
                <tr key={key}>
                  <td style={{ color: customization.fontColor }}>
                    {el.service}
                  </td>
                  <td style={{ color: customization.fontColor }}>
                    USD {el.rate}
                  </td>
                  <td style={{ color: customization.fontColor }}>
                    USD {el.quantity}
                  </td>
                  <td style={{ color: customization.fontColor }}>
                    USD {el.rate * el.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles["totals"]}>
            <div className=''>
              <p>Subtotal</p>
              <p>USD {total}</p>
            </div>
            <div className=''>
              <p>Amount Due</p>
              <p>USD {total}</p>
            </div>
          </div>
        </div>
        <div className={styles["invoice-payment"]}>
          <h3>How to Pay</h3>
          <li>
            <p>Account Number</p>
            <p>{userInfo.accountnumber || "-"}</p>
          </li>
          <li>
            <p>Bank Name</p>
            <p>{userInfo.bankname || "-"}</p>
          </li>
          <li>
            <p>Account Name</p>
            <p>{userInfo.accountname || "-"}</p>
          </li>
        </div>
      </div>
      <div className={styles["invoice-terms"]}>
        <h3 style={{ color: customization.fontColor }}>Terms and Conditions</h3>
        <li style={{ color: customization.fontColor }}>
          {userInfo.terms || "-"}
        </li>
      </div>
    </div>
  );
}
