export const HowItWorks = () => {
    const steps = [
        {
            number: 1,
            title: "Book a Free Consultation",
            description: "Schedule a 30-minute call to discuss your project requirements, timeline, and goals."
        },
        {
            number: 2,
            title: "Get a Clear Proposal",
            description: "Within 24-48 hours, receive a detailed proposal with scope, timeline, and pricing."
        },
        {
            number: 3,
            title: "Development & Updates",
            description: "I'll build your project with regular updates and opportunities for feedback."
        },
        {
            number: 4,
            title: "Launch & Support",
            description: "Your project goes live with 30 days of post-launch support included."
        }
    ];

    return (
        <section className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>

            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {steps.map((step) => (
                    <div key={step.number} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
                            {step.number}
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
