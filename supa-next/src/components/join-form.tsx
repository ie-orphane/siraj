"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TagInput } from "@/components/ui/tag-input"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { submitJoinForm } from "@/app/actions/submit-form"
import { toast } from "sonner"

interface UserData {
  id: string
  name: string
  email: string
  image?: string
}

interface JoinFormProps {
  userData?: UserData
}

export function JoinForm({ userData }: JoinFormProps) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [tel, setTel] = useState("")
  const [team, setTeam] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [about, setAbout] = useState("")
  const [timeAvailability, setTimeAvailability] = useState("more-5")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Pre-fill form fields with user data (except email)
  useEffect(() => {
    if (userData) {
      setFullname(userData.name || "")
      // Extract username from email (part before @)
      if (userData.email) {
        const usernameFromEmail = userData.email.split('@')[0]
        setUsername(usernameFromEmail)
      }
      // Note: Email field is NOT auto-filled - user must enter it manually
    }
  }, [userData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!username || !fullname || !email || !team || skills.length === 0 || !about) {
      toast.error("يرجى ملء جميع الحقول الإلزامية")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitJoinForm({
        username,
        fullname,
        email,
        tel,
        team,
        skills,
        about,
        timeAvailability,
        notes,
      })

      if (result.success) {
        toast.success("تم إرسال طلبك بنجاح!")
        router.push('/succ-join')
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-20">
      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground font-kufam">
          هل ترغب في أن تكون جزءًا
          <br />
          من نادي سراج؟
        </h1>
        <p className="text-muted-foreground leading-relaxed text-base md:text-lg lg:text-xl mb-2">
          يسعدنا اهتمامك! يرجى ملء النموذج التالي حتى نتعرف عليك أكثر
          <br />
          ونوجهك إلى الفريق الأنسب لمهاراتك واهتماماتك.
        </p>
        <p className="text-destructive text-sm">* خانات إلزامية</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16">
        {/* Personal Information Section */}
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
            <h2 className="font-kufam font-medium text-secondary-on-container whitespace-nowrap px-2 after:content-['*'] after:text-base after:mr-1 after:text-destructive">
              المعلومات الشخصية
            </h2>
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
          </div>

          <div className="space-y-6 bg-card/30 p-8 rounded-lg">
            <div>
              <Label htmlFor="username" className="text-right block mb-2 text-sm">
                اسم المستخدم (المدرسي):
                {userData?.email && (
                  <span className="text-green-600 text-xs mr-2">(تم التعبئة تلقائياً)</span>
                )}
              </Label>
              <Input 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-right bg-background py-5" 
                placeholder="aalaoui"
                required
              />
            </div>

            <div>
              <Label htmlFor="fullname" className="text-right block mb-2 text-sm">
                الاسم الكامل
                {userData?.name && (
                  <span className="text-green-600 text-xs mr-2">(تم التعبئة تلقائياً)</span>
                )}
              </Label>
              <Input 
                id="fullname" 
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="text-right bg-background py-5" 
                placeholder="أحمد العلوي"
                required
              />
            </div>

            <div>
              <Label htmlFor="tel" className="text-right block mb-2 text-sm">
                رقم الهاتف:
              </Label>
              <Input
                id="tel"
                type="tel"
                maxLength={10}
                value={tel}
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) setTel(e.target.value);
                }}
                className="text-right bg-background py-5"
                placeholder="06XX1XXX7X"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-right block mb-2 text-sm">
                البريد الإلكتروني
              </Label>
              <Input 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-right bg-background py-5" 
                placeholder="ahmed@alaoui.ma"
                required
              />
            </div>
          </div>
        </div>

        {/* Team Selection Section */}
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
            <h2 className="font-kufam font-medium text--secondary whitespace-nowrap px-2 after:content-['*'] after:text-base after:mr-1 after:text-destructive">
              الفريق الذي ترغب في الانضمام إليه
            </h2>
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
          </div>

          <div className="bg-card/30 p-8 rounded-lg">
            <Select value={team} onValueChange={setTeam} required>
              <SelectTrigger className="w-full text-right cursor-pointer flex-row-reverse bg-background py-5">
                <SelectValue placeholder="اختر الفريق" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectItem value="design" className="cursor-pointer">
                  🎨 فريق التصميم
                </SelectItem>
                <SelectItem value="evenings" className="cursor-pointer">
                  🌙 فريق الأمسيات
                </SelectItem>
                <SelectItem value="activities" className="cursor-pointer">
                  📅 فريق الأنشطة والفعاليات
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Skills Section */}
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
            <h2 className="font-kufam font-medium text--secondary whitespace-nowrap px-2 after:content-['*'] after:text-base after:mr-1 after:text-destructive">
              المهارات أو الأدوات التي تتقنها
            </h2>
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
          </div>

          <div className="bg-card/30 p-8 rounded-lg">
            <div className="relative">
              <TagInput
                tags={skills}
                onTagsChange={setSkills}
                placeholder="برمجة بايثون، تصميم جرافيك،
                مونتاج فيديو..."
                maxTags={10}
                maxLength={30}
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
            <h2 className="font-kufam font-medium text--secondary whitespace-nowrap px-2 after:content-['*'] after:text-base after:mr-1 after:text-destructive">
              نبذة مختصرة عنك، شغفك، هواياتك؟
            </h2>
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
          </div>

          <div className="bg-card/30 p-8 rounded-lg">
            <div className="relative">
              <Textarea
                value={about}
                maxLength={250}
                onChange={(e) => setAbout(e.target.value)}
                className="text-right min-h-[150px] resize-none bg-background"
                placeholder="أحب التصميم والإبداع، أتطلع مهاراتي في تجربة المستخدم..."
              />
              <p className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                <span>
                  شاركنا نبذة قصيرة عنك، ما يثير شغفك، وطموحاتك المستقبلية.
                </span>
                <span>250/{about.length}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Time Availability Section */}
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
            <h2 className="font-kufam font-medium text--secondary whitespace-nowrap px-2 after:content-['*'] after:text-base after:mr-1 after:text-destructive">
              الوقت الذي يمكنك تخصيصه للنادي أسبوعيًا؟
            </h2>
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
          </div>

          <div className="bg-card/30 p-8 rounded-lg">
            <RadioGroup value={timeAvailability} onValueChange={setTimeAvailability}>
              <div className="flex items-center justify-end gap-3 p-3 rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
                <Label htmlFor="less-3" className="cursor-pointer text-sm">
                  أقل من 3 ساعات
                </Label>
                <RadioGroupItem value="less-3" id="less-3" />
              </div>
              <div className="flex items-center justify-end gap-3 p-3 rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
                <Label htmlFor="3-5" className="cursor-pointer text-sm">
                  من 3 إلى 5 ساعات
                </Label>
                <RadioGroupItem value="3-5" id="3-5" />
              </div>
              <div className="flex items-center justify-end gap-3 p-3 rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
                <Label htmlFor="more-5" className="cursor-pointer text-sm">
                  أكثر من 5 ساعات
                </Label>
                <RadioGroupItem value="more-5" id="more-5" />
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Additional Notes Section */}
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
            <h2 className="font-kufam font-medium text--secondary whitespace-nowrap px-2">
              ملاحظات إضافية أو اقتراحات :
            </h2>
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
          </div>

          <div className="bg-card/30 p-8 rounded-lg">
            <div className="relative">
              <Textarea
                value={notes}
                maxLength={250}
                onChange={(e) => setNotes(e.target.value)}
                className="text-right min-h-[150px] resize-none bg-background"
                placeholder="شاركنا ملاحظاتك أو أي أفكار قد تساعدنا في تحسينك..."
              />
              <p className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                <span>اختياري: يمكنك إضافة أي معلومات إضافية تراها مهمة</span>
                <span>250/{notes.length}</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          {/* Privacy Notice */}
            <p className="text-sm text-center text-muted-foreground leading-relaxed mb-6">
              جميع المعلومات التي تقدمها سرية، وتُستخدم فقط لأغراض تقييم الانضمام
              للنادي، ولن تتم مشاركتها مع أي طرف ثالث.
            </p>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={
                isSubmitting ||
                !username ||
                !fullname ||
                !email ||
                !team ||
                skills.length === 0 ||
                !about
              }
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2.5 h-fit text-[1.0625rem] rounded-lg"
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
