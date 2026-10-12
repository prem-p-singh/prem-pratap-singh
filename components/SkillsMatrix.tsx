import { skills } from "@/profile/personal";

export default function SkillsMatrix() {
  return (
    <ul className="grid gap-x-8 md:grid-cols-2">
      {skills.map((skill) => (
        <li key={skill.category} className="border-t border-border py-5">
          {/* The base h3 rule is unlayered, so the sans needs the important flag to win. */}
          <h3 className="font-sans! text-base font-semibold leading-relaxed text-foreground">
            {skill.category}{" "}
            <span className="text-sm font-normal tabular-nums text-muted-foreground">
              {skill.items.length}
            </span>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{skill.items.join(", ")}</p>
        </li>
      ))}
    </ul>
  );
}
