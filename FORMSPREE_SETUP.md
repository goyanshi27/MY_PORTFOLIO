# 📧 Formspree Setup - Get Emails in 2 Minutes!

## Super Easy Setup (FREE - No Credit Card)

### Step 1: Sign Up (30 seconds)
1. Go to: https://formspree.io/
2. Click "Get Started" (FREE)
3. Sign up with your email: **goyanshimohanty@gmail.com**
4. Verify your email

### Step 2: Create Form (30 seconds)
1. After login, click "+ New Form"
2. Give it a name: "Portfolio Contact Form"
3. Click "Create Form"
4. Copy your **Form ID** (looks like: `xyzabc123`)

### Step 3: Update Your Website (1 minute)
1. Open `portfolio/contact.html`
2. Find line 106 (the form action):
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Replace `YOUR_FORM_ID` with your actual Form ID:
   ```html
   <form action="https://formspree.io/f/xyzabc123" method="POST">
   ```
4. Save the file

### Step 4: Test It! (30 seconds)
1. Open your portfolio website
2. Go to Contact page
3. Fill out the form and submit
4. Check your Gmail: **goyanshimohanty@gmail.com**
5. You'll receive the message! 🎉

## That's It! ✅

Now every contact form submission will be sent directly to your Gmail!

## What You Get (FREE):
- ✅ 50 submissions per month (FREE forever)
- ✅ Email notifications to your Gmail
- ✅ Spam filtering
- ✅ No coding required
- ✅ Works immediately

## Example:
If your Form ID is `xyzabc123`, your form should look like:
```html
<form action="https://formspree.io/f/xyzabc123" method="POST" id="contactForm">
```

## Need More Submissions?
- FREE: 50/month
- GOLD: $10/month = 1,000 submissions
- PLATINUM: $40/month = Unlimited

For a portfolio, FREE is perfect!

---

**Total Setup Time: 2 minutes** ⏱️
**Difficulty: Super Easy** 😊
