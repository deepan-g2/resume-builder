// Export configuration for react-to-print
export const getPrintStyles = () => `
  @page {
    size: A4;
    margin: 0;
  }

  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    body {
      margin: 0;
      padding: 0;
    }

    /* Hide everything except the resume */
    body > div:first-child > header,
    body > div:first-child > main > div > div:first-child {
      display: none !important;
    }

    /* Make preview full width */
    body > div:first-child > main > div {
      display: block !important;
    }

    /* Remove shadows and adjust for print */
    #resume-preview > div {
      box-shadow: none !important;
      max-width: 100% !important;
    }
  }
`;
