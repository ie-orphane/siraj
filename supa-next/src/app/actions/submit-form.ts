'use server'

export interface JoinFormData {
  username: string
  fullname: string
  email: string
  team: string
  skills: string[]
  about: string
  timeAvailability: string
  notes?: string
}

export async function submitJoinForm(formData: JoinFormData) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL

    if (!adminEmail) {
      throw new Error('Admin email not configured')
    }

    // Format the email content
    const emailContent = `
      طلب انضمام جديد - نادي سراج
      
      ═══════════════════════════════════
      المعلومات الشخصية
      ═══════════════════════════════════
      
      اسم المستخدم: ${formData.username}
      الاسم الكامل: ${formData.fullname}
      البريد الإلكتروني: ${formData.email}
      
      ═══════════════════════════════════
      معلومات الانضمام
      ═══════════════════════════════════
      
      الفريق المختار: ${formData.team}
      
      المهارات:
      ${formData.skills.map(skill => `  • ${skill}`).join('\n')}
      
      نبذة عن المتقدم:
      ${formData.about}
      
      الوقت المتاح أسبوعياً: ${formData.timeAvailability}
      
      ${formData.notes ? `ملاحظات إضافية:\n${formData.notes}` : ''}
      
      ═══════════════════════════════════
      تم الإرسال: ${new Date().toLocaleString('ar-SA')}
    `

    // Log to console (you can replace this with actual email sending)
    console.log('New Join Request:')
    console.log(emailContent)

    // Here you would integrate with an email service like Resend, SendGrid, etc.
    // Example with Resend:
    /*
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'نادي سراج <onboarding@resend.dev>',
      to: adminEmail,
      subject: `طلب انضمام جديد - ${formData.fullname}`,
      text: emailContent,
    })
    */

    // For now, we'll simulate sending and return success
    return { success: true, message: 'تم إرسال طلبك بنجاح' }
  } catch (error) {
    console.error('Form submission error:', error)
    return { 
      success: false, 
      message: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.' 
    }
  }
}

