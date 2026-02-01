const inputData = $input.all()[0].json;
let rawText = inputData.text || "[]";

// Nettoyage standard
rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

let newJobs = [];
try {
    newJobs = JSON.parse(rawText);
} catch (e) {
    newJobs = []; 
}

const startupContext = $('Split In Batches').item.json;
const startupName = startupContext.name || "Sans Nom";
const oldJobs = startupContext.current_jobs || [];

// --- LA MAGIE (CORRIGÉE POUR LES OBJETS) ---
// On filtre : on garde le job SEULEMENT SI on ne trouve pas d'équivalent (Même titre ET Même lieu) dans oldJobs
const newlySpotted = newJobs.filter(newJob => {
    const exists = oldJobs.some(oldJob => 
        oldJob.title === newJob.title && 
        oldJob.location === newJob.location
    );
    return !exists; // Si ça n'existe pas, on garde (c'est nouveau)
});

const hasChanged = newlySpotted.length > 0;

// Formatage pour Slack : Tiret + Retour à la ligne (\n)
const newlySpottedText = newlySpotted
    .map(job => `• ${job.title} (${job.location})`)
    .join("\n");

return [{
    json: {
        startup_name: startupName,
        has_changed: hasChanged,
        new_jobs: newJobs,       // La liste COMPLÈTE (pour écraser l'ancienne dans Supabase)
        old_jobs: oldJobs,
        newly_spotted: newlySpotted, // Juste les nouveaux (pour info)
        newly_spotted_text: newlySpottedText // Le texte formaté pour Slack
    }
}];