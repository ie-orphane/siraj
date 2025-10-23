"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TagInput } from "@/components/ui/tag-input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { submitJoinForm } from "@/app/actions/submit-form"

export function JoinForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [team, setTeam] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [about, setAbout] = useState("")
  const [timeAvailability, setTimeAvailability] = useState("more-5")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!username || !fullname || !email || !team || skills.length === 0 || !about) {
      alert("يرجى ملء جميع الحقول الإلزامية")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitJoinForm({
        username,
        fullname,
        email,
        team,
        skills,
        about,
        timeAvailability,
        notes,
      })

      if (result.success) {
        router.push('/succ-join')
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground" style={{ fontFamily: "var(--font-amiri)" }}>
          هل ترغب في أن تكون جزءًا
          <br />
          من نادي سراج؟
        </h1>
        <p className="text-muted-foreground leading-relaxed text-base mb-2">
          يسعدنا انضمامك! يرجى ملء النموذج التالي حتى نتعرف عليك أكثر
          <br />
          ونتوصل إلى الفريق الأنسب لمهاراتك واهتماماتك.
        </p>
        <p className="text-destructive text-sm">* حقائب إلزامية</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16">
        {/* Personal Information Section */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-10">
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
            <h2 className="text-base font-semibold text-foreground whitespace-nowrap px-2">* المعلومات الشخصية</h2>
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
          </div>

          <div className="space-y-6 bg-card/30 p-8 rounded-lg">
            <div>
              <Label htmlFor="username" className="text-right block mb-2 text-sm">
                اسم المستخدم (الاسم/رمزي)
              </Label>
              <Input 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-right bg-background" 
                placeholder="الإيمايل"
                required
              />
            </div>

            <div>
              <Label htmlFor="fullname" className="text-right block mb-2 text-sm">
                الاسم الكامل
              </Label>
              <Input 
                id="fullname" 
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="text-right bg-background" 
                placeholder="الفاعل المجتمع"
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
                className="text-right bg-background" 
                placeholder="[email protected]"
                required
              />
            </div>
          </div>
        </div>

        {/* Team Selection Section */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-10">
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
            <h2 className="text-base font-semibold text-foreground whitespace-nowrap px-2">
              * الفريق الذي ترغب في الانضمام إليه
            </h2>
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
          </div>

          <div className="bg-card/30 p-8 rounded-lg">
            <Select value={team} onValueChange={setTeam} required>
              <SelectTrigger className="w-full text-right bg-background h-12">
                <SelectValue placeholder="اختر الفريق" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design" className="text-right cursor-pointer">
                  🎨 فريق التصميم
                </SelectItem>
                <SelectItem value="evenings" className="text-right cursor-pointer">
                  🌙 فريق الأمسيات
                </SelectItem>
                <SelectItem value="activities" className="text-right cursor-pointer">
                  📅 فريق الأنشطة والفعاليات
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Skills Section */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-10">
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
            <h2 className="text-base font-semibold text-foreground whitespace-nowrap px-2">
              * المهارات أو الأدوات التي تتقنها
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
                placeholder="أضف مهارة أو أداة..."
                maxTags={10}
                maxLength={30}
              />
              <p className="text-xs text-muted-foreground text-right mt-3">
                اكتب مهاراتك بشكل واضح، مثلاً: برمجة بايثون، تصميم جرافيك، مونتاج فيديو
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-10">
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
            <h2 className="text-base font-semibold text-foreground whitespace-nowrap px-2">
              * نبذة مختصرة عنك، شغفك، هواياتك؟
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
                onChange={(e) => setAbout(e.target.value)}
                className="text-right min-h-[150px] resize-none bg-background"
                placeholder="أحب التصميم والإبداع، أتطلع مهاراتي في تجربة المستخدم..."
              />
              <div className="text-xs text-muted-foreground text-left mt-2">{about.length}/0</div>
              <p className="text-xs text-muted-foreground text-right mt-3">
                شاركنا قصة قصيرة عنك، ما الذي تشغف، وشغفك المستقبلية
              </p>
            </div>
          </div>
        </div>

        {/* Time Availability Section */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-10">
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
            <h2 className="text-base font-semibold text-foreground whitespace-nowrap px-2">
              * الوقت الذي يمكنك تخصيصه للنادي أسبوعيًا؟
            </h2>
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
          </div>

          <div className="bg-card/30 p-8 rounded-lg">
            <RadioGroup value={timeAvailability} onValueChange={setTimeAvailability} className="space-y-4">
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
          <div className="flex items-center gap-4 mb-10">
            <div className="relative flex-1">
              <div className="h-px bg-border" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-border bg-background" />
            </div>
            <h2 className="text-base font-semibold text-foreground whitespace-nowrap px-2">
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
                onChange={(e) => setNotes(e.target.value)}
                className="text-right min-h-[150px] resize-none bg-background"
                placeholder="شاركنا ملاحظاتك أو أي أفكار قد تساعدنا في تحسينك..."
              />
              <div className="text-xs text-muted-foreground text-left mt-2">{notes.length}/0</div>
              <p className="text-xs text-muted-foreground text-right mt-3">
                اختياري: يمكنك إضافة أي معلومات إضافية تراها مهمة
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <p className="text-xs text-muted-foreground text-center leading-relaxed px-4">
          جميع المعلومات التي تقدمها سرية ولن تستخدم إلا لأغراض التواصل معك والتأكد من أنك المرشح الأنسب لفريق النادي.
          لن يتم مشاركتها مع أي جهة خارجية.
        </p>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-16 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال"}
          </Button>
        </div>
      </form>
    </div>
  )
}
