"use server";

import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import nodemailer from "nodemailer";

// Get team name in Arabic
function getTeamName(teamValue: string): string {
  const teams: { [key: string]: string } = {
    design: "🎨 فريق التصميم",
    evenings: "🌙 فريق الأمسيات",
    activities: "📅 فريق الأنشطة والفعاليات",
  };
  return teams[teamValue] || teamValue;
}

// Get time availability in Arabic
function getTimeAvailability(value: string): string {
  const times: { [key: string]: string } = {
    "less-3": "أقل من 3 ساعات",
    "3-5": "من 3 إلى 5 ساعات",
    "more-5": "أكثر من 5 ساعات",
  };
  return times[value] || value;
}

export async function submitJoinForm(formData: JoinFormData) {
  try {
    // Get the current user session
    const session = await getSession();

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    // First, store the form data in the database
    const supabase = await createClient();

    const { data: submission, error: dbError } = await supabase
      .from("submissions")
      .insert({
        id: session.user.id,
        avatar: session.user.image ?? null,
        login: formData.login,
        name: formData.name,
        email: formData.email,
        tel: formData.tel,
        team: formData.team,
        skills: formData.skills,
        about: formData.about,
        availability: formData.availability,
        notes: formData.notes ?? null,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store form submission in database");
    }

    // Now proceed with email sending
    const adminEmail = process.env.ADMIN_EMAIL;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!adminEmail) {
      throw new Error("Admin email not configured");
    }

    // Format the email content
    const emailContent = `
طلب انضمام جديد - نادي سراج

═══════════════════════════════════
المعلومات الشخصية
═══════════════════════════════════

اسم المستخدم: ${formData.login}
الاسم الكامل: ${formData.name}
البريد الإلكتروني: ${formData.email}
رقم الهاتف: ${formData.tel}

═══════════════════════════════════
معلومات الانضمام
═══════════════════════════════════

الفريق المختار: ${getTeamName(formData.team)}

المهارات:
${formData.skills.map((skill) => `  • ${skill}`).join("\n")}

نبذة عن المتقدم:
${formData.about}

الوقت المتاح أسبوعياً: ${getTimeAvailability(formData.availability)}

${formData.notes ? `ملاحظات إضافية:\n${formData.notes}` : "لا توجد ملاحظات إضافية"}

═══════════════════════════════════
تم الإرسال: ${new Date().toLocaleString("ar-SA", {
      timeZone: "Asia/Riyadh",
      dateStyle: "full",
      timeStyle: "short",
    })}
    `;

    // HTML version for better formatting
    const emailHTML = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #D4AF37 0%, #F4C430 100%); color: #000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .section { background: white; padding: 15px; margin: 15px 0; border-radius: 8px; border-right: 4px solid #D4AF37; }
    .section-title { color: #D4AF37; font-weight: bold; font-size: 18px; margin-bottom: 10px; border-bottom: 2px solid #D4AF37; padding-bottom: 5px; }
    .field { margin: 10px 0; }
    .field-label { font-weight: bold; color: #666; }
    .field-value { color: #333; margin-right: 10px; }
    .skills-list { list-style: none; padding: 0; }
    .skills-list li { background: #fff3cd; padding: 5px 10px; margin: 5px 0; border-radius: 4px; display: inline-block; }
    .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>طلب انضمام جديد</h1>
      <p>نادي سراج</p>
    </div>
    <div class="content">
      <div class="section">
        <div class="section-title">المعلومات الشخصية</div>
        <div class="field">
          <span class="field-label">اسم المستخدم:</span>
          <span class="field-value">${formData.login}</span>
        </div>
        <div class="field">
          <span class="field-label">الاسم الكامل:</span>
          <span class="field-value">${formData.name}</span>
        </div>
        <div class="field">
          <span class="field-label">البريد الإلكتروني:</span>
          <span class="field-value"><a href="mailto:${formData.email}">${formData.email}</a></span>
        </div>
        <div class="field">
          <span class="field-label">رقم الهاتف:</span>
          <span class="field-value"><a href="tel:${formData.tel}">${formData.tel}</a></span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">معلومات الانضمام</div>
        <div class="field">
          <span class="field-label">الفريق المختار:</span>
          <span class="field-value">${getTeamName(formData.team)}</span>
        </div>
        <div class="field">
          <span class="field-label">المهارات:</span>
          <ul class="skills-list">
            ${formData.skills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
        </div>
        <div class="field">
          <span class="field-label">نبذة عن المتقدم:</span>
          <div style="background: white; padding: 10px; border-radius: 4px; margin-top: 5px;">
            ${formData.about.replace(/\n/g, "<br>")}
          </div>
        </div>
        <div class="field">
          <span class="field-label">الوقت المتاح أسبوعياً:</span>
          <span class="field-value">${getTimeAvailability(formData.availability)}</span>
        </div>
        ${
          formData.notes
            ? `
        <div class="field">
          <span class="field-label">ملاحظات إضافية:</span>
          <div style="background: white; padding: 10px; border-radius: 4px; margin-top: 5px;">
            ${formData.notes.replace(/\n/g, "<br>")}
          </div>
        </div>
        `
            : ""
        }
      </div>

      <div class="footer">
        <p>تم الإرسال: ${new Date().toLocaleString("ar-SA", {
          timeZone: "Asia/Riyadh",
          dateStyle: "full",
          timeStyle: "short",
        })}</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Send email using SMTP if configured
    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      try {
        // Create transporter
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort),
          secure: false, // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // Send email
        await transporter.sendMail({
          from: `"نادي سراج" <${smtpUser}>`,
          to: adminEmail,
          subject: `طلب انضمام جديد - ${formData.name}`,
          text: emailContent,
          html: emailHTML,
        });

        // Update database to mark email as sent
        const { error: updateError } = await supabase
          .from("submissions")
          .update({
            email_sent: true,
            email_sent_at: new Date().toISOString(),
          })
          .eq("id", submission.id);

        if (updateError) {
          console.error("Failed to update email status:", updateError);
        }
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    return { success: true, message: "تم إرسال طلبك بنجاح" };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.",
    };
  }
}
