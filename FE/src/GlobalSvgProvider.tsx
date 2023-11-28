import { css } from '@emotion/react';
import { createPortal } from 'react-dom';

const spliteSvgCode = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    css={css`
      display: none;
    `}
  >
    <symbol id="close-circle" viewBox="0 0 40 40">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM13.0808 13.0642C14.2525 11.8928 16.152 11.893 17.3234 13.0647L19.9982 15.74L22.6696 13.0686C23.8412 11.897 25.7407 11.897 26.9122 13.0686C28.0838 14.2402 28.0838 16.1397 26.9122 17.3113L24.2404 19.9831L26.9154 22.6587C28.0869 23.8304 28.0867 25.7299 26.915 26.9013C25.7433 28.0728 23.8438 28.0726 22.6724 26.9009L19.9978 24.2257L17.3282 26.8953C16.1567 28.0668 14.2572 28.0668 13.0856 26.8953C11.914 25.7237 11.914 23.8242 13.0856 22.6526L15.7556 19.9826L13.0804 17.3069C11.9089 16.1352 11.9091 14.2357 13.0808 13.0642Z"
        fill="white"
      />
    </symbol>
    <symbol id="close" viewBox="0 0 24 25">
      <g id="Frame" clipPath="url(#clip0_289_791)">
        <path
          id="Vector"
          d="M23.4772 3.35322C24.1798 2.62789 24.0679 1.55056 23.2223 0.947888C22.3767 0.345222 21.1208 0.441222 20.4182 1.16656L11.9995 9.83322L3.58085 1.16656C2.87826 0.441222 1.62231 0.345222 0.77671 0.947888C-0.0688857 1.55056 -0.180803 2.62789 0.521788 3.35322L9.40676 12.4999L0.521788 21.6466C-0.180803 22.3719 -0.0688857 23.4492 0.77671 24.0519C1.62231 24.6546 2.87826 24.5586 3.58085 23.8332L11.9995 15.1666L20.4182 23.8332C21.1208 24.5586 22.3767 24.6546 23.2223 24.0519C24.0679 23.4492 24.1798 22.3719 23.4772 21.6466L14.5923 12.4999L23.4772 3.35322Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_289_791">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </symbol>
    <symbol id="script" viewBox="5 5 40 40">
      <path
        d="M31.5994 4.41999C30.7794 3.59999 29.3594 4.15999 29.3594 5.29999V12.28C29.3594 15.2 31.8394 17.62 34.8594 17.62C36.7594 17.64 39.3994 17.64 41.6594 17.64C42.7994 17.64 43.3994 16.3 42.5994 15.5C39.7194 12.6 34.5594 7.37999 31.5994 4.41999Z"
        fill="white"
      />
      <path
        d="M41 20.38H35.22C30.48 20.38 26.62 16.52 26.62 11.78V6C26.62 4.9 25.72 4 24.62 4H16.14C9.98 4 5 8 5 15.14V32.86C5 40 9.98 44 16.14 44H31.86C38.02 44 43 40 43 32.86V22.38C43 21.28 42.1 20.38 41 20.38ZM23 35.5H15C14.18 35.5 13.5 34.82 13.5 34C13.5 33.18 14.18 32.5 15 32.5H23C23.82 32.5 24.5 33.18 24.5 34C24.5 34.82 23.82 35.5 23 35.5ZM27 27.5H15C14.18 27.5 13.5 26.82 13.5 26C13.5 25.18 14.18 24.5 15 24.5H27C27.82 24.5 28.5 25.18 28.5 26C28.5 26.82 27.82 27.5 27 27.5Z"
        fill="white"
      />
    </symbol>
    <symbol id="next" viewBox="4 4 40 40">
      <path
        d="M7.51953 14.4401V33.5801C7.51953 37.5001 11.7795 39.9601 15.1795 38.0001L23.4795 33.2201L31.7795 28.4201C35.1795 26.4601 35.1795 21.5601 31.7795 19.6001L23.4795 14.8001L15.1795 10.0201C11.7795 8.06012 7.51953 10.5001 7.51953 14.4401Z"
        fill="white"
      />
      <path
        d="M40.4805 37.8601C39.6605 37.8601 38.9805 37.1801 38.9805 36.3601V11.6401C38.9805 10.8201 39.6605 10.1401 40.4805 10.1401C41.3005 10.1401 41.9805 10.8201 41.9805 11.6401V36.3601C41.9805 37.1801 41.3205 37.8601 40.4805 37.8601Z"
        fill="white"
      />
    </symbol>
    <symbol id="record-start" viewBox="4 4 40 40">
      <path
        d="M23.9395 4C12.8995 4 3.93945 12.96 3.93945 24C3.93945 35.04 12.8995 44 23.9395 44C34.9795 44 43.9395 35.04 43.9395 24C43.9395 12.96 34.9995 4 23.9395 4ZM23.9995 32.46C19.3195 32.46 15.5395 28.68 15.5395 24C15.5395 19.32 19.3195 15.54 23.9995 15.54C28.6795 15.54 32.4595 19.32 32.4595 24C32.4595 28.68 28.6795 32.46 23.9995 32.46Z"
        fill="white"
      />
    </symbol>
    <symbol id="record-stop" viewBox="4 4 40 40">
      <path
        d="M23.9395 4C12.8995 4 3.93945 12.96 3.93945 24C3.93945 35.04 12.8995 44 23.9395 44C34.9795 44 43.9395 35.04 43.9395 24C43.9395 12.96 34.9995 4 23.9395 4ZM23.9995 32.46C19.3195 32.46 15.5395 28.68 15.5395 24C15.5395 19.32 19.3195 15.54 23.9995 15.54C28.6795 15.54 32.4595 19.32 32.4595 24C32.4595 28.68 28.6795 32.46 23.9995 32.46Z"
        fill="#E05241"
      />
    </symbol>
    <symbol id="timer" viewBox="2 2 28 28">
      <path
        d="M15.9995 6.2002C9.62612 6.2002 4.43945 11.3869 4.43945 17.7602C4.43945 24.1335 9.62612 29.3335 15.9995 29.3335C22.3728 29.3335 27.5595 24.1469 27.5595 17.7735C27.5595 11.4002 22.3728 6.2002 15.9995 6.2002ZM16.9995 17.3335C16.9995 17.8802 16.5461 18.3335 15.9995 18.3335C15.4528 18.3335 14.9995 17.8802 14.9995 17.3335V10.6669C14.9995 10.1202 15.4528 9.66686 15.9995 9.66686C16.5461 9.66686 16.9995 10.1202 16.9995 10.6669V17.3335Z"
        fill="white"
      />
      <path
        d="M19.8542 4.59984H12.1475C11.6142 4.59984 11.1875 4.17317 11.1875 3.63984C11.1875 3.1065 11.6142 2.6665 12.1475 2.6665H19.8542C20.3875 2.6665 20.8142 3.09317 20.8142 3.6265C20.8142 4.15984 20.3875 4.59984 19.8542 4.59984Z"
        fill="white"
      />
    </symbol>
    <symbol id="google-logo" viewBox="0 0 20 20">
      <mask
        id="mask0_544_1076"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <path d="M20 0H0V20H20V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_544_1076)">
        <path
          d="M19.6 10.2273C19.6 9.51816 19.5364 8.83636 19.4182 8.18176H10V12.05H15.3818C15.15 13.3 14.4455 14.3591 13.3864 15.0682V17.5773H16.6182C18.5091 15.8364 19.6 13.2727 19.6 10.2273Z"
          fill="#4285F4"
        />
        <path
          d="M10.0009 20C12.7009 20 14.9645 19.1045 16.619 17.5773L13.3872 15.0682C12.4918 15.6682 11.3463 16.0227 10.0009 16.0227C7.39625 16.0227 5.19175 14.2636 4.40535 11.9H1.06445V14.4909C2.70995 17.7591 6.09175 20 10.0009 20Z"
          fill="#34A853"
        />
        <path
          d="M4.4045 11.9001C4.2045 11.3001 4.0909 10.6592 4.0909 10.0001C4.0909 9.34096 4.2045 8.70006 4.4045 8.10006V5.50916H1.0636C0.3864 6.85916 0 8.38646 0 10.0001C0 11.6137 0.3864 13.141 1.0636 14.491L4.4045 11.9001Z"
          fill="#FBBC04"
        />
        <path
          d="M10.0009 3.9773C11.469 3.9773 12.7872 4.4818 13.8236 5.4727L16.6918 2.6045C14.96 0.9909 12.6963 0 10.0009 0C6.09175 0 2.70995 2.2409 1.06445 5.5091L4.40535 8.1C5.19175 5.7364 7.39625 3.9773 10.0009 3.9773Z"
          fill="#E94235"
        />
      </g>
    </symbol>
    <symbol id="save-idrive" viewBox="0 0 48 48">
      <path
        opacity="0.4"
        d="M40.5426 34.3798C38.5426 36.1998 35.9626 37.1998 33.2626 37.1798H33.0825C33.6825 35.9398 34.0025 34.5398 34.0025 33.0598C34.0025 27.5398 29.5225 23.0598 24.0025 23.0598C18.4825 23.0598 14.0025 27.5398 14.0025 33.0598C14.0025 34.5398 14.3226 35.9398 14.9226 37.1798H11.0825C1.7225 36.5198 1.7225 22.8998 11.0825 22.2398H11.1826C4.7626 4.3798 31.8425 -2.7602 34.9425 15.9998C43.6025 17.0998 47.1026 28.6398 40.5426 34.3798Z"
        fill="#477FEE"
      />
      <path
        d="M24 23.0601C18.48 23.0601 14 27.5401 14 33.0601C14 34.5401 14.32 35.9401 14.92 37.1801C15.08 37.5401 15.26 37.8801 15.46 38.2001C17.18 41.1001 20.36 43.0601 24 43.0601C27.64 43.0601 30.82 41.1001 32.54 38.2001C32.74 37.8801 32.92 37.5401 33.08 37.1801C33.68 35.9401 34 34.5401 34 33.0601C34 27.5401 29.52 23.0601 24 23.0601ZM28.14 32.2001L23.88 36.1401C23.6 36.4001 23.22 36.5401 22.86 36.5401C22.48 36.5401 22.1 36.4001 21.8 36.1001L19.8199 34.1201C19.2399 33.5401 19.2399 32.5801 19.8199 32.0001C20.3999 31.4201 21.3599 31.4201 21.9399 32.0001L22.9 32.9601L26.1 30.0001C26.72 29.4401 27.66 29.4801 28.22 30.0801C28.78 30.6801 28.74 31.6201 28.14 32.2001Z"
        fill="#477FEE"
      />
    </symbol>
    <symbol id="save-local" viewBox="0 0 48 48">
      <path
        opacity="0.4"
        d="M41 20.38H35.22C30.48 20.38 26.62 16.52 26.62 11.78V6C26.62 4.9 25.72 4 24.62 4H16.14C9.98 4 5 8 5 15.14V32.86C5 40 9.98 44 16.14 44H31.86C38.02 44 43 40 43 32.86V22.38C43 21.28 42.1 20.38 41 20.38Z"
        fill="#477FEE"
      />
      <path
        d="M31.5994 4.41999C30.7794 3.59999 29.3594 4.15999 29.3594 5.29999V12.28C29.3594 15.2 31.8394 17.62 34.8594 17.62C36.7594 17.64 39.3994 17.64 41.6594 17.64C42.7994 17.64 43.3994 16.3 42.5994 15.5C39.7194 12.6 34.5594 7.37999 31.5994 4.41999Z"
        fill="#477FEE"
      />
      <path
        d="M24.5589 29.44C23.9789 28.86 23.0189 28.86 22.4389 29.44L20.9989 30.88V22.5C20.9989 21.68 20.3189 21 19.4989 21C18.6789 21 17.9989 21.68 17.9989 22.5V30.88L16.5589 29.44C15.9789 28.86 15.0189 28.86 14.4389 29.44C13.8589 30.02 13.8589 30.98 14.4389 31.56L18.4389 35.56C18.4589 35.58 18.4789 35.58 18.4789 35.6C18.5989 35.72 18.7589 35.82 18.9189 35.9C19.1189 35.96 19.2989 36 19.4989 36C19.6989 36 19.8789 35.96 20.0589 35.88C20.2389 35.8 20.3989 35.7 20.5589 35.56L24.5589 31.56C25.1389 30.98 25.1389 30.02 24.5589 29.44Z"
        fill="#477FEE"
      />
    </symbol>
    <symbol id="save-not" viewBox="0 0 48 48">
      <path
        opacity="0.4"
        d="M41.36 12.6399V39.8999C41.36 43.4999 38.78 45.0199 35.64 43.2799L25.88 37.8399C24.84 37.2799 23.16 37.2799 22.12 37.8399L12.36 43.2799C11.52 43.7399 10.72 43.9799 10 43.9999L41.36 12.6399Z"
        fill="#477FEE"
      />
      <path
        d="M40.2406 7.76L6.78063 41.22C6.68063 40.82 6.64062 40.38 6.64062 39.9V11.72C6.64062 7.48 10.1006 4 14.3606 4H33.6406C36.4406 4 38.9006 5.5 40.2406 7.76Z"
        fill="#477FEE"
      />
      <path
        d="M43.5417 4.46001C42.9417 3.86001 41.9617 3.86001 41.3617 4.46001L4.46172 41.38C3.86172 41.98 3.86172 42.96 4.46172 43.56C4.76172 43.84 5.14172 44 5.54172 44C5.94172 44 6.32172 43.84 6.62172 43.54L43.5417 6.62001C44.1617 6.02001 44.1617 5.06001 43.5417 4.46001Z"
        fill="#477FEE"
      />
    </symbol>
    <symbol id="send" viewBox="0 0 24 24">
      <path
        d="M16.1401 2.95998L7.11012 5.95998C1.04012 7.98998 1.04012 11.3 7.11012 13.32L9.79012 14.21L10.6801 16.89C12.7001 22.96 16.0201 22.96 18.0401 16.89L21.0501 7.86998C22.3901 3.81998 20.1901 1.60998 16.1401 2.95998ZM16.4601 8.33998L12.6601 12.16C12.5101 12.31 12.3201 12.38 12.1301 12.38C11.9401 12.38 11.7501 12.31 11.6001 12.16C11.3101 11.87 11.3101 11.39 11.6001 11.1L15.4001 7.27998C15.6901 6.98998 16.1701 6.98998 16.4601 7.27998C16.7501 7.56998 16.7501 8.04998 16.4601 8.33998Z"
        fill="#292D32"
      />
    </symbol>
    <symbol id="private" viewBox="0 0 18 18">
      <path
        d="M8.99984 13.5124C9.67501 13.5124 10.2223 12.9651 10.2223 12.2899C10.2223 11.6147 9.67501 11.0674 8.99984 11.0674C8.32468 11.0674 7.77734 11.6147 7.77734 12.2899C7.77734 12.9651 8.32468 13.5124 8.99984 13.5124Z"
        fill="#292D32"
      />
      <path
        d="M13.71 7.6475V6.71C13.71 4.685 13.2225 2 9 2C4.7775 2 4.29 4.685 4.29 6.71V7.6475C2.19 7.91 1.5 8.975 1.5 11.5925V12.9875C1.5 16.0625 2.4375 17 5.5125 17H12.4875C15.5625 17 16.5 16.0625 16.5 12.9875V11.5925C16.5 8.975 15.81 7.91 13.71 7.6475ZM9 14.555C7.7475 14.555 6.735 13.535 6.735 12.29C6.735 11.0375 7.755 10.025 9 10.025C10.245 10.025 11.265 11.045 11.265 12.29C11.265 13.5425 10.2525 14.555 9 14.555ZM5.5125 7.58C5.4525 7.58 5.4 7.58 5.34 7.58V6.71C5.34 4.5125 5.9625 3.05 9 3.05C12.0375 3.05 12.66 4.5125 12.66 6.71V7.5875C12.6 7.5875 12.5475 7.5875 12.4875 7.5875H5.5125V7.58Z"
        fill="#292D32"
      />
    </symbol>
    <symbol id="public" viewBox="0 0 18 18">
      <path
        d="M8.99935 0.666504C4.39935 0.666504 0.666016 4.39984 0.666016 8.99984C0.666016 13.5998 4.39935 17.3332 8.99935 17.3332C13.5993 17.3332 17.3327 13.5998 17.3327 8.99984C17.3327 4.39984 13.5993 0.666504 8.99935 0.666504ZM2.33268 8.99984C2.33268 8.4915 2.39935 7.9915 2.50768 7.5165L6.49102 11.4998V12.3332C6.49102 13.2498 7.24102 13.9998 8.15768 13.9998V15.6082C4.88268 15.1915 2.33268 12.3915 2.33268 8.99984ZM13.9077 13.4998C13.691 12.8248 13.0743 12.3332 12.3243 12.3332H11.491V9.83317C11.491 9.37484 11.116 8.99984 10.6577 8.99984H5.65768V7.33317H7.32435C7.78268 7.33317 8.15768 6.95817 8.15768 6.49984V4.83317H9.82435C10.741 4.83317 11.491 4.08317 11.491 3.1665V2.82484C13.9327 3.80817 15.666 6.20817 15.666 8.99984C15.666 10.7332 14.991 12.3165 13.9077 13.4998Z"
        fill="#50924E"
      />
    </symbol>
    <symbol id="link" viewBox="0 0 20 20">
      <path
        d="M12.8427 15.4916C12.5094 15.4916 12.2344 15.2166 12.2344 14.8833C12.2344 14.5499 12.5094 14.2749 12.8427 14.2749C15.1927 14.2749 17.1094 12.3583 17.1094 10.0083C17.1094 7.65827 15.1927 5.7416 12.8427 5.7416C10.4927 5.7416 8.57604 7.65827 8.57604 10.0083C8.57604 10.3416 8.30104 10.6166 7.96771 10.6166C7.63438 10.6166 7.35938 10.3416 7.35938 10.0083C7.35938 6.98327 9.81771 4.5166 12.851 4.5166C15.8844 4.5166 18.3344 6.97493 18.3344 9.99993C18.3344 13.0249 15.876 15.4916 12.8427 15.4916Z"
        fill="#292D32"
      />
      <path
        d="M7.15964 4.50879C7.49297 4.50879 7.76797 4.78379 7.76797 5.11712C7.76797 5.45046 7.49297 5.72546 7.15964 5.72546C4.80964 5.72546 2.89297 7.64212 2.89297 9.99212C2.89297 12.3421 4.80964 14.2588 7.15964 14.2588C9.50964 14.2588 11.4263 12.3421 11.4263 9.99212C11.4263 9.65879 11.7013 9.38379 12.0346 9.38379C12.368 9.38379 12.643 9.65879 12.643 9.99212C12.643 13.0171 10.1846 15.4838 7.1513 15.4838C4.11797 15.4838 1.66797 13.0255 1.66797 10.0005C1.66797 6.97546 4.1263 4.50879 7.15964 4.50879Z"
        fill="#292D32"
      />
    </symbol>
    <symbol id="edit" viewBox="0 0 32 32">
      <path
        d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
        fill="#F5F5F5"
      />
      <path
        d="M8 20.6671V24H11.3329L21.1626 14.1703L17.8297 10.8374L8 20.6671ZM23.74 11.5928C24.0867 11.2462 24.0867 10.6863 23.74 10.3397L21.6603 8.25996C21.3137 7.91335 20.7538 7.91335 20.4072 8.25996L18.7807 9.8864L22.1136 13.2193L23.74 11.5928Z"
        fill="#9299A1"
      />
    </symbol>
    <symbol id="trash" viewBox="0 0 24 24">
      <path
        d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z"
        fill="#E05241"
      />
      <path
        d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8397 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z"
        fill="#E05241"
      />
    </symbol>
    <symbol id="check-box" viewBox="0 0 24 24">
      <path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="inherit"
      />
    </symbol>
    <symbol id="share-workbook" viewBox="0 0 20 20">
      <path
        d="M15.5747 9.60817C15.0997 9.48317 14.5414 9.4165 13.8747 9.4165C12.9497 9.4165 12.6081 9.6415 12.1331 9.99984C12.1081 10.0165 12.0831 10.0415 12.0581 10.0665L11.2664 10.9082C10.5997 11.6082 9.39974 11.6165 8.73307 10.8998L7.94141 10.0665C7.91641 10.0415 7.89141 10.0165 7.86641 9.99984C7.39141 9.6415 7.04974 9.4165 6.12474 9.4165C5.45807 9.4165 4.89974 9.48317 4.42474 9.60817C2.44141 10.1415 2.44141 11.7165 2.44141 13.0998V13.8748C2.44141 15.9665 2.44141 18.3332 6.89974 18.3332H13.0997C16.0581 18.3332 17.5581 16.8332 17.5581 13.8748V13.0998C17.5581 11.7165 17.5581 10.1415 15.5747 9.60817ZM11.9414 15.3332H8.05807C7.74141 15.3332 7.48307 15.0748 7.48307 14.7498C7.48307 14.4248 7.74141 14.1665 8.05807 14.1665H11.9414C12.2581 14.1665 12.5164 14.4248 12.5164 14.7498C12.5164 15.0748 12.2581 15.3332 11.9414 15.3332Z"
        fill="#9299A1"
      />
      <path
        d="M10.5581 2.22484C10.5581 1.9165 10.3081 1.6665 9.99974 1.6665C9.69141 1.6665 9.44141 1.9165 9.44141 2.22484V3.33317H10.5664V2.22484H10.5581Z"
        fill="#9299A1"
      />
      <path
        d="M16.0089 7.01683V8.4335C15.9755 8.41683 15.9339 8.4085 15.9005 8.40016H15.8922C15.3005 8.24183 14.6422 8.16683 13.8755 8.16683C12.5922 8.16683 11.9839 8.54183 11.4339 8.9585C11.3172 9.04183 11.2339 9.12516 11.1505 9.2085L10.3589 10.0502C10.2755 10.1335 10.1422 10.1835 10.0005 10.1835C9.93385 10.1835 9.76719 10.1752 9.64219 10.0418L8.82552 9.1835C8.74219 9.09183 8.64219 9.01683 8.61719 9.00016C8.01719 8.54183 7.40885 8.16683 6.12552 8.16683C5.35885 8.16683 4.70052 8.24183 4.10052 8.40016C4.06719 8.4085 4.02552 8.41683 3.99219 8.4335V7.01683C3.99219 5.29183 3.99219 3.3335 7.67552 3.3335H9.44219V6.2085L8.90052 5.66683C8.67552 5.44183 8.32552 5.44183 8.10052 5.66683C7.88385 5.8835 7.88385 6.24183 8.10052 6.4585L9.60052 7.9585C9.60885 7.96683 9.61719 7.96683 9.61719 7.97516C9.66719 8.01683 9.72552 8.0585 9.78385 8.0835C9.85885 8.1085 9.92552 8.12516 10.0005 8.12516C10.0755 8.12516 10.1422 8.1085 10.2172 8.0835C10.2839 8.0585 10.3422 8.01683 10.4005 7.9585L11.9005 6.4585C12.1172 6.24183 12.1172 5.8835 11.9005 5.66683C11.6755 5.44183 11.3255 5.44183 11.1005 5.66683L10.5589 6.2085V3.3335H12.3255C16.0089 3.3335 16.0089 5.29183 16.0089 7.01683Z"
        fill="#9299A1"
      />
    </symbol>
  </svg>
);

export default function GlobalSVGProvider() {
  return createPortal(spliteSvgCode, document.body);
}
