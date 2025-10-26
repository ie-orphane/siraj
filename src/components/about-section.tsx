import { Card } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-kufam mb-4">من نحن؟</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 - Vision */}
          <Card className="px-8 py-10 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow bg-card">
            <svg
              viewBox="0 0 61 64"
              fill="none"
              className="text-primary size-12 mb-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.4241 10.8779L36.9465 11.9551L38.8118 11.9785L44.9231 12.0566L46.886 17.8447L47.4856 19.6113L48.9797 20.7266L53.8782 24.3818L52.0647 30.2188L51.511 32L52.0647 33.7812L53.8782 39.6172L48.9797 43.2734L47.4856 44.3887L46.886 46.1553L44.9231 51.9424L38.8118 52.0215L36.9465 52.0449L35.4241 53.1221L30.4338 56.6504L25.4436 53.1221L23.9211 52.0449L22.0559 52.0215L15.9436 51.9424L13.9817 46.1553L13.3821 44.3887L11.8879 43.2734L6.98853 39.6172L8.80298 33.7812L9.35669 32L8.80298 30.2188L6.98853 24.3818L11.8879 20.7266L13.3821 19.6113L13.9817 17.8447L15.9436 12.0566L22.0559 11.9785L23.9211 11.9551L25.4436 10.8779L30.4338 7.34863L35.4241 10.8779Z"
                stroke="currentColor"
                strokeWidth="12"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2 font-kufam">التعريف و الرؤية</h3>
            <p className="text-muted-foreground leading-relaxed">
              نادي سراج هو نادٍ مدرسي يهدف إلى تطوير الطلبة في مناح كثيرة عن
              طريق تعليمهم، يسعى النادي إلى تكوين بيئة ترفع بتعارف الطلبة
              بالطالب بشؤون للطالب إلى تحصير في المعارف الشخصية. يل بتجاوزالمال
              الجوانب الفكرية والروحية. هدف النادي هو طالب بعينين على بصيرتهم
              وبنور فيل متابعة ومهارة وبرام كيف يفكر ويتخذ القرارات بشكل سليم
            </p>
          </Card>

          {/* Card 2 - Principles */}
          <Card className="px-8 py-10 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow bg-card">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              className="text-primary size-12 mb-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M64 64H0V0H64V64ZM31.8564 21.4463L23.9766 13L12.4727 13.626L12 24.8877L20.5098 32.708L12 40.6846L12.4727 51.4775L23.9766 51.9463L31.8564 43.5L39.7354 51.9463L51.082 51.4775L51.5547 40.6846L43.0449 32.708L51.5547 24.8877L51.082 13.626L39.7354 13L31.8564 21.4463Z"
                fill="currentColor"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2 font-kufam">المبادئ التأسيسية</h3>
            <p className="text-muted-foreground leading-relaxed">
              نادي سراج هو نادٍ مدرسي يهدف إلى تطوير الطلبة في مناح كثيرة عن
              طريق تعليمهم، يسعى النادي إلى تكوين بيئة ترفع بتعارف الطلبة
              بالطالب بشؤون للطالب إلى تحصير في المعارف الشخصية. يل بتجاوزالمال
              الجوانب الفكرية والروحية. هدف النادي هو طالب بعينين على بصيرتهم
              وبنور فيل متابعة ومهارة وبرام كيف يفكر ويتخذ القرارات بشكل سليم
            </p>
          </Card>

          {/* Card 3 - Goal */}
          <Card className="px-8 py-10 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow bg-card">
            <svg
              className="text-primary size-12 mb-6"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.8008 13.9238L38.6621 15.916L41.3867 15.8232L48.4141 15.585L48.1768 22.6133L48.084 25.3379L50.0762 27.1992L55.2119 32L50.0762 36.8008L48.084 38.6621L48.1768 41.3867L48.4141 48.4141L41.3867 48.1768L38.6621 48.084L36.8008 50.0762L32 55.2119L27.1992 50.0762L25.3379 48.084L22.6133 48.1768L15.585 48.4141L15.8232 41.3867L15.916 38.6621L13.9238 36.8008L8.78711 32L13.9238 27.1992L15.916 25.3379L15.8232 22.6133L15.585 15.585L22.6133 15.8232L25.3379 15.916L27.1992 13.9238L32 8.78711L36.8008 13.9238Z"
                stroke="currentColor"
                strokeWidth="12"
              />
            </svg>

            <h3 className="text-xl font-medium mb-2 font-kufam">هدف النادي</h3>
            <p className="text-muted-foreground leading-relaxed">
              نادي سراج هو نادٍ مدرسي يهدف إلى تطوير الطلبة في مناح كثيرة عن
              طريق تعليمهم، يسعى النادي إلى تكوين بيئة ترفع بتعارف الطلبة
              بالطالب بشؤون للطالب إلى تحصير في المعارف الشخصية. يل بتجاوزالمال
              الجوانب الفكرية والروحية. هدف النادي هو طالب بعينين على بصيرتهم
              وبنور فيل متابعة ومهارة وبرام كيف يفكر ويتخذ القرارات بشكل سليم
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
