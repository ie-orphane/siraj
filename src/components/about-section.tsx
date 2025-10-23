import { Card } from "@/components/ui/card"
import { Lightbulb, Target, BookOpen } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">من نحن؟</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 - Vision */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow bg-card">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">التعريف و الرؤية</h3>
            <p className="text-muted-foreground leading-relaxed">
              نادي سراج هو نادٍ مدرسي يهدف إلى تطوير الطلبة في مناح كثيرة عن طريق تعليمهم، يسعى النادي إلى تكوين بيئة
              ترفع بتعارف الطلبة بالطالب بشؤون للطالب إلى تحصير في المعارف الشخصية. يل بتجاوزالمال الجوانب الفكرية
              والروحية. هدف النادي هو طالب بعينين على بصيرتهم وبنور فيل متابعة ومهارة وبرام كيف يفكر ويتخذ القرارات بشكل
              سليم
            </p>
          </Card>

          {/* Card 2 - Principles */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow bg-card">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">المبادئ التأسيسية</h3>
            <p className="text-muted-foreground leading-relaxed">
              نادي سراج هو نادٍ مدرسي يهدف إلى تطوير الطلبة في مناح كثيرة عن طريق تعليمهم، يسعى النادي إلى تكوين بيئة
              ترفع بتعارف الطلبة بالطالب بشؤون للطالب إلى تحصير في المعارف الشخصية. يل بتجاوزالمال الجوانب الفكرية
              والروحية. هدف النادي هو طالب بعينين على بصيرتهم وبنور فيل متابعة ومهارة وبرام كيف يفكر ويتخذ القرارات بشكل
              سليم
            </p>
          </Card>

          {/* Card 3 - Goal */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow bg-card">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">هدف النادي</h3>
            <p className="text-muted-foreground leading-relaxed">
              نادي سراج هو نادٍ مدرسي يهدف إلى تطوير الطلبة في مناح كثيرة عن طريق تعليمهم، يسعى النادي إلى تكوين بيئة
              ترفع بتعارف الطلبة بالطالب بشؤون للطالب إلى تحصير في المعارف الشخصية. يل بتجاوزالمال الجوانب الفكرية
              والروحية. هدف النادي هو طالب بعينين على بصيرتهم وبنور فيل متابعة ومهارة وبرام كيف يفكر ويتخذ القرارات بشكل
              سليم
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
