import PrivacyPolicy from "@/models/privacyPolicyModel";
import { connectDB } from "../mongodb";
import clientPromise from "../mongodbClient";
import TermsConditions from "@/models/termsConditionsModel";
import RefundPolicy from "@/models/refundPolicyModel";
// import CallPlan from "@/models/callPlanModel";

export async function getTestimonialsData({
  isVisible = true,
  limit = 3,
  page = 1,
}) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const skip = (page - 1) * limit;

    const query = { isVisible };
    const [testimonials, total] = await Promise.all([
      db
        .collection("testimonials")
        .find(query)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection("testimonials").countDocuments(query),
    ]);

    return {
      testimonials: JSON.parse(JSON.stringify(testimonials)),
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return { testimonials: [], total: 0, totalPages: 0, currentPage: page };
  }
}

export async function getPrivacyPolicy() {
  try {
    await connectDB();

    const privacyPolicy = await PrivacyPolicy.findOne();
    return privacyPolicy ? JSON.parse(JSON.stringify(privacyPolicy)) : null;
  } catch (error) {
    console.error(`Error fetching privacyPolicy:`, error);
    return null;
  }
}

export async function getTermsConditions() {
  try {
    await connectDB();

    const termsConditions = await TermsConditions.findOne();
    return termsConditions ? JSON.parse(JSON.stringify(termsConditions)) : null;
  } catch (error) {
    console.error(`Error fetching termsConditions:`, error);
    return null;
  }
}

export async function getRefundPolicy() {
  try {
    await connectDB();

    const refundPolicy = await RefundPolicy.findOne();
    return refundPolicy ? JSON.parse(JSON.stringify(refundPolicy)) : null;
  } catch (error) {
    console.error(`Error fetching refundPolicy:`, error);
    return null;
  }
}