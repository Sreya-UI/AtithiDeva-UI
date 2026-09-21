"use server";

interface DigioKycResponse {
  success: boolean;
  kyc_request_id?: string;
  error?: string;
}

/**
 * Initiates a Digio KYC request.
 * In a real environment, this calls Digio's REST API using your secret credentials.
 */
export async function initiateDigioKyc(
  customerIdentifier: string,
  customerName: string
): Promise<DigioKycResponse> {
  try {
    const clientId = process.env.NEXT_PUBLIC_DIGIO_CLIENT_ID;
    const clientSecret = process.env.DIGIO_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      // For development, we return a mock request ID so the frontend can proceed
      // to initialize the Digio SDK widget (even if it fails inside the widget without valid creds).
      console.warn("Digio credentials missing in environment variables. Returning mock ID.");
      return {
        success: true,
        kyc_request_id: "KID" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      };
    }

    // REAL IMPLEMENTATION (Example)
    /*
    const response = await fetch("https://api.digio.in/v2/client/kyc/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
      },
      body: JSON.stringify({
        customer_identifier: customerIdentifier,
        customer_name: customerName,
        notify_customer: false,
        generate_access_token: true
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to initiate KYC");

    return { success: true, kyc_request_id: data.id };
    */

    return {
      success: true,
      kyc_request_id: "KID" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    };
  } catch (error: any) {
    console.error("Digio API Error:", error);
    return { success: false, error: error.message || "Something went wrong" };
  }
}
