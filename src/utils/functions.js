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
