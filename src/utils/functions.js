import * as XLSX from "xlsx";

export const calculateGST = (amount, gstRate = 18) => {
  const gstAmount = (amount * gstRate) / 100;
  const totalAmount = amount + gstAmount;

  return {
    baseAmount: amount,
    gstRate,
    gstAmount: parseFloat(gstAmount.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    cgst: parseFloat((gstAmount / 2).toFixed(2)),
    sgst: parseFloat((gstAmount / 2).toFixed(2)),
    igst: parseFloat(gstAmount.toFixed(2)),
  };
};

export const TDSCalculator = (
  amount,
  tdsPercentage = 10,
  panAvailable = true
) => {
  // Double rate if PAN not available
  const effectiveRate = panAvailable ? tdsPercentage : tdsPercentage * 2;
  const tdsAmount = (amount * effectiveRate) / 100;
  const netAmount = amount - tdsAmount;

  return {
    baseAmount: amount,
    tdsRate: effectiveRate,
    tdsAmount: parseFloat(tdsAmount.toFixed(2)),
    netAmount: parseFloat(netAmount.toFixed(2)),
    panAvailable: panAvailable,
  };
};

export const TradeDiscount = (amount, discountPercentage = 10) => {
  const discountAmount = (amount * discountPercentage) / 100;
  const discountedAmount = amount - discountAmount;
  return {
    baseAmount: amount,
    discountPercentage,
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    discountedAmount: parseFloat(discountedAmount.toFixed(2)),
  };
};

export const SLACalculator = (amount, SLATerms, DueDate) => {
  if (!SLATerms) return;
  const { penaltyType, penaltyValue, incentiveType, incentiveValue, slaType } =
    SLATerms;

  const today = new Date();
  const due = new Date(DueDate);

  // Calculate days difference (positive = late, negative = early)
  const diffDays = Math.floor((today - due) / (1000 * 60 * 60 * 24));

  let result = {
    status: "", // 'penalty' or 'incentive' or 'onTime'
    value: 0,
    totalAmount: amount,
  };

  if (slaType === "Time Based") {
    if (diffDays > 0) {
      // ✅ Late submission => apply penalty
      result.status = "penalty";

      if (penaltyType === "Percentage") {
        result.value = (amount * penaltyValue) / 100;
      } else if (penaltyType === "Fixed") {
        result.value = penaltyValue;
      }

      result.totalAmount = amount - result.value;
    } else if (diffDays < 0) {
      // ✅ Early submission => apply incentive
      result.status = "incentive";

      if (incentiveType === "Percentage") {
        result.value = (amount * incentiveValue) / 100;
      } else if (incentiveType === "Fixed") {
        result.value = incentiveValue;
      }

      result.totalAmount = amount + result.value;
    } else {
      // ✅ On-time delivery
      result.status = "onTime";
      result.value = 0;
      result.totalAmount = amount;
    }
  }

  return result;
};

export const convenienceCharge = (amount, chargePercentage = 2) => {
  const chargeAmount = (amount * chargePercentage) / 100;
  const totalAmount = amount + chargeAmount;

  return {
    baseAmount: amount,
    chargePercentage: chargePercentage,
    chargeAmount: parseFloat(chargeAmount.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
  };
};

export function generateLargeXLSX(rowCount = 50000) {
  const providers = [
    "68f9fd6f7fb5699d03125bc0",
    "68f9fd9f7fb5699d03125bc2",
    "68f9fde67fb5699d03125bc4",
    "68fa00cb7fb5699d03125d81",
    "68fa27d1f15b840f7906a7fb",
  ];

  const desc = [
    "Payment done",
    "Invoice payment",
    "Service fee",
    "Project completion",
    "Monthly subscription",
    "Consultation fee",
    "Maintenance charge",
    "Software license",
    "Hardware purchase",
    "Training session",
  ];

  const data = [
    ["serviceProvider", "workReferenceId", "dueDate", "description", "amount"],
  ];
  const usedIds = new Set();

  const start = new Date("2025-10-27").getTime();
  const end = new Date("2026-12-31").getTime();

  for (let i = 0; i < rowCount; i++) {
    let id;
    do {
      id = `WORK-${Math.floor(Math.random() * 1_000_000) + 100_000}`;
    } while (usedIds.has(id));
    usedIds.add(id);

    const provider =
      Math.random() < 0.1
        ? "68fa27d1f15b840f7906a7fb"
        : providers[Math.floor(Math.random() * providers.length)];
    const date = new Date(start + Math.random() * (end - start));
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
    const description = desc[Math.floor(Math.random() * desc.length)];
    const amount = Math.floor(Math.random() * 95000) + 5000;

    data.push([provider, id, formattedDate, description, amount]);
  }

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, "data_50000.xlsx");
  console.log("✅ Excel file generated: data_50000.xlsx");
}
