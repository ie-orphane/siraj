# إعداد البريد الإلكتروني - Email Setup

## الخطوة 1: إنشاء ملف البيئة

قم بإنشاء ملف `.env.local` في المجلد الرئيسي للمشروع:

```bash
# في مجلد supa-next/
touch .env.local
```

## الخطوة 2: إضافة البريد الإلكتروني

أضف البريد الإلكتروني إلى الملف:

```env
ADMIN_EMAIL=mskerba13@gmail.com
```

## الخطوة 3: إعداد خدمة البريد (اختياري)

حالياً، النظام يقوم بتسجيل البيانات في Console. لإرسال البريد الفعلي:

### الطريقة 1: استخدام Resend (موصى به)

1. سجل في [Resend](https://resend.com)
2. احصل على API Key
3. أضف إلى `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

4. ثبت المكتبة:

```bash
npm install resend
```

5. قم بإلغاء التعليق على كود Resend في الملف:
   `src/app/actions/submit-form.ts`

### الطريقة 2: استخدام SMTP (Gmail, Outlook, etc.)

1. أضف إلى `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

2. ثبت nodemailer:

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

## ملاحظات مهمة

- ملف `.env.local` لن يتم رفعه إلى Git (موجود في .gitignore)
- للإنتاج، أضف المتغيرات في إعدادات Vercel/Hosting
- استخدم App Password بدلاً من كلمة مرور Gmail العادية

## اختبار النظام

بعد الإعداد، قم بملء النموذج وتحقق من:

1. Console Logs في Terminal
2. البريد الوارد على `mskerba13@gmail.com`
3. الانتقال إلى صفحة الشكر

---

# English Instructions

## Step 1: Create Environment File

Create `.env.local` in project root:

```bash
touch .env.local
```

## Step 2: Add Email

```env
ADMIN_EMAIL=mskerba13@gmail.com
```

## Step 3: Setup Email Service (Optional)

Currently logging to console. For actual email sending:

### Option 1: Using Resend (Recommended)

1. Sign up at [Resend](https://resend.com)
2. Get API Key
3. Add to `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

4. Install: `npm install resend`
5. Uncomment Resend code in `src/app/actions/submit-form.ts`

### Option 2: Using SMTP

1. Add credentials to `.env.local`
2. Install: `npm install nodemailer @types/nodemailer`
3. Implement SMTP logic in submit-form.ts

## Testing

Submit form and check:
- Console logs
- Email inbox
- Redirect to success page

