
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message } = await req.json();
    
    // Validate inputs
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders
          } 
        }
      );
    }

    console.log("Preparing to send email with inputs:", { name, email, subject });
    console.log("SMTP Environment Variables present:", {
      host: !!Deno.env.get("SMTP_HOST"),
      port: !!Deno.env.get("SMTP_PORT"),
      username: !!Deno.env.get("SMTP_USERNAME"),
      password: !!Deno.env.get("SMTP_PASSWORD"),
      from: !!Deno.env.get("SMTP_FROM"),
    });

    try {
      // Create SMTP client with environment variables
      const client = new SMTPClient({
        connection: {
          hostname: Deno.env.get("SMTP_HOST") || "",
          port: Number(Deno.env.get("SMTP_PORT")) || 587,
          tls: true,
          auth: {
            username: Deno.env.get("SMTP_USERNAME") || "",
            password: Deno.env.get("SMTP_PASSWORD") || "",
          },
        },
      });

      // Prepare email content
      const emailContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `;

      // Send the email
      await client.send({
        from: Deno.env.get("SMTP_FROM") || "contact@name.edu.np",
        to: "info@name.edu.np",
        bcc: "anwar@name.edu.np",
        subject: `Contact Form: ${subject}`,
        content: emailContent,
        html: emailContent,
      });

      console.log("Email sent successfully");
      await client.close();

      return new Response(
        JSON.stringify({ success: true }),
        { 
          status: 200, 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders
          } 
        }
      );
    } catch (emailError) {
      console.error("Error in SMTP client:", emailError);
      
      return new Response(
        JSON.stringify({ error: "Email server error: " + (emailError.message || "Unknown error") }),
        { 
          status: 500, 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders
          } 
        }
      );
    }
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send message" }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        } 
      }
    );
  }
});
