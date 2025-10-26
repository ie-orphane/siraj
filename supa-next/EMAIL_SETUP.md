# إعداد البريد الإلكتروني - Email Setup

## ✅ تم التثبيت والإعداد

تم إعداد نظام إرسال البريد الإلكتروني باستخدام SMTP و nodemailer!

## 📧 إعداد Gmail SMTP

### الخطوة 1: إنشاء App Password لـ Gmail

1. افتح [Google Account Security](https://myaccount.google.com/security)
2. فعّل **التحقق بخطوتين** (2-Step Verification) إذا لم يكن مفعلاً
3. بعد تفعيل التحقق بخطوتين، ابحث عن **App Passwords**
4. اختر التطبيق: **Mail** والجهاز: **Other (Custom name)**
5. اكتب: `Siraj Club Form`
6. اضغط **Generate**
7. سيظهر لك رمز مكون من 16 حرف - احتفظ به

### الخطوة 2: تحديث ملف .env.local

افتح ملف `.env.local` وحدث المعلومات التالية:

```env
# Email Configuration
ADMIN_EMAIL=mskerba13@gmail.com

# SMTP Configuration for sending emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com        # غير هذا إلى بريدك
SMTP_PASS=your_app_password           # ضع الـ App Password هنا
```

**مثال:**
```env
SMTP_USER=mskerba13@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
```

## 🧪 اختبار النظام

1. أعد تشغيل خادم التطوير:
```bash
npm run dev
```

2. اذهب إلى `/join` واملأ النموذج
3. اضغط على زر "إرسال"
4. تحقق من:
   - Console في Terminal (لوجود لوجات النظام)
   - البريد الوارد على `mskerba13@gmail.com`

## 📧 محتوى البريد

البريد سيحتوي على:
- ✅ جميع معلومات المتقدم
- ✅ تنسيق HTML جميل مع ألوان النادي (ذهبي)
- ✅ جميع المهارات كقائمة منسقة
- ✅ التاريخ والوقت بالتوقيت السعودي
- ✅ تنسيق عربي RTL

## 🔧 ملاحظات مهمة

### إذا لم يعمل البريد:
1. تأكد من صحة App Password (16 حرف)
2. تأكد من عدم وجود مسافات إضافية
3. تحقق من Console للأخطاء
4. تأكد من تفعيل التحقق بخطوتين في Google

### للإنتاج (Production):
عند نشر الموقع على Vercel أو أي منصة أخرى:
1. أضف جميع المتغيرات في إعدادات البيئة (Environment Variables)
2. **لا تضع** الـ App Password في Git أبداً
3. استخدم Vercel/Netlify Environment Variables

### خدمات SMTP البديلة:
- **Gmail**: مجاني، حد 500 بريد/يوم
- **Outlook/Hotmail**: smtp-mail.outlook.com, Port 587
- **Yahoo**: smtp.mail.yahoo.com, Port 587

---

# English Instructions - SMTP Setup Complete

## ✅ Installation Complete

Email system is ready with SMTP using nodemailer!

## 📧 Gmail SMTP Setup

### Step 1: Generate App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not enabled
3. Find **App Passwords** section
4. Select app: **Mail** and device: **Other (Custom name)**
5. Enter: `Siraj Club Form`
6. Click **Generate**
7. Save the 16-character code

### Step 2: Update .env.local

Open `.env.local` and update:

```env
ADMIN_EMAIL=mskerba13@gmail.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
```

### Step 3: Restart and Test

```bash
npm run dev
```

Submit form at `/join` and check:
- Terminal console logs
- Email inbox at `mskerba13@gmail.com`

## 🎨 Email Features

- Beautiful HTML formatting with gold theme
- RTL Arabic layout
- All applicant information organized
- Skills displayed as styled list
- Timestamp in Saudi Arabia timezone

## 🚀 Production Deployment

For Vercel/Netlify:
1. Add all environment variables in platform settings
2. Never commit `.env.local` to Git (already in .gitignore)
3. Test email after deployment

## 📦 Installed Packages

- `nodemailer` - SMTP email sending
- `@types/nodemailer` - TypeScript types
