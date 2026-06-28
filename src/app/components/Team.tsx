import { motion } from 'motion/react';
import pic1 from '@/assets/PIC 1.jpeg';
import pic2 from '@/assets/PIC 2.jpeg';
import pic3 from '@/assets/PIC 3.jpeg';
import pic4 from '@/assets/PIC 4.jpeg';
import groupPhoto from '@/assets/company.jpeg';

export function Team() {
    const teamHierarchy = {
        md: {
            name: 'MR. CHAMINDA GAMAGE',
            role: 'MANAGING DIRECTOR AND FOUNDER',
            image: pic1,
        },
        finance: {
            name: 'P.B.DILINI PAMODHIKA NANDASENA',
            role: 'HEAD OF FINANCE',
            image: pic2,
        },
        leads: [
            {
                name: 'MR. M.G.N.DHARSHANA',
                role: 'HEAD OF WORKSHOP',
                image: pic3,
            },
            {
                name: 'B. AADHITHYAN',
                role: 'DESIGNER',
                image: pic4,
            },
        ]
    };

    const TeamCard = ({ member, className = "", size = "sm" }: { member: any, className?: string, size?: "sm" | "md" | "lg" }) => {
        const sizes = {
            sm: { wrap: 'max-w-[280px]', img: 'h-[280px]', pad: 'p-5', title: 'text-lg', role: 'text-[10px]' },
            md: { wrap: 'max-w-[340px]', img: 'h-[340px]', pad: 'p-6', title: 'text-xl', role: 'text-[11px]' },
            lg: { wrap: 'max-w-[400px]', img: 'h-[400px]', pad: 'p-8', title: 'text-2xl', role: 'text-xs' }
        };
        const s = sizes[size] || sizes.sm;

        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-300 ${s.wrap} mx-auto w-full border border-gray-100 ${className}`}
            >
                <div className={`${s.img} overflow-hidden`}>
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                    />
                </div>
                <div className={`${s.pad} text-center`}>
                    <h3 className={`${s.title} font-bold mb-1 text-secondary tracking-tight`}>
                        {member.name}
                    </h3>
                    <p className={`text-primary font-bold ${s.role} uppercase tracking-[0.2em] leading-tight`}>
                        {member.role}
                    </p>
                </div>
            </motion.div>
        );
    };

    return (
        <section id="team" className="py-20 lg:py-32 border-t-4 border-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full border-2 border-primary">
                        <span className="text-primary font-semibold">Our Team</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-secondary">
                        Meet the <span className="text-primary">Minds</span> Behind Super Ads
                    </h2>

                    <p className="text-lg text-muted-foreground">
                        Our organizational hierarchy ensures seamless execution and creative excellence in every campaign.
                    </p>
                </motion.div>

                {/* Hierarchical Layout (Pyramid) */}
                <div className="max-w-4xl mx-auto flex flex-col gap-8">

                    {/* Row 1: Managing Director */}
                    <div className="w-full">
                        <TeamCard member={teamHierarchy.md} size="lg" />
                    </div>

                    {/* Row 2: Head of Finance */}
                    <div className="w-full">
                        <TeamCard member={teamHierarchy.finance} size="md" />
                    </div>

                    {/* Row 3: Staff Leads (2 columns) */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {teamHierarchy.leads.map((member, index) => (
                            <TeamCard key={index} member={member} className="w-full" />
                        ))}
                    </div>

                    {/* Row 4: Full-width Group Photo Banner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full h-[280px] md:h-[320px] relative rounded-3xl overflow-hidden shadow-xl border-4 border-white"
                    >
                        <img
                            src={groupPhoto}
                            alt="Super Ads Group"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 md:p-8">
                            <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase">THE SUPER ADS TEAM</h3>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
