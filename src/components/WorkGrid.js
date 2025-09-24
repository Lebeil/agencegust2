"use client"
import { useState, useMemo } from 'react'
import WorkItem from "@/components/WorkItem"
import Filters from './Filters'

const WorkGrid = ({ projects = [] }) => {
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedSecteurs, setSelectedSecteurs] = useState([])

    const tagsArray = useMemo(() => {
        // Adapter à la structure actuelle - utiliser category comme tag temporaire
        return projects.map(item => item.category || '').filter(category => category).filter((value, index, self) => self.indexOf(value) === index)
    }, [projects])

    const secteursArray = useMemo(() => {
        // Pour l'instant, retourner un tableau vide puisque secteurs n'existe pas dans les données actuelles
        return []
    }, [projects])

    const handleTagClick = (tag) => {
        setSelectedTags(prevSelected => {
            if (prevSelected.includes(tag)) {
                return prevSelected.filter(item => item !== tag)
            } else {
                return [...prevSelected, tag]
            }
        })
    }

    const handleSecteurClick = (secteur) => {
        setSelectedSecteurs(prevSelected => {
            if (prevSelected.includes(secteur)) {
                return prevSelected.filter(item => item !== secteur)
            } else {
                return [...prevSelected, secteur]
            }
        })
    }

    const filteredWork = useMemo(() => {
        return projects.filter(item => {
            const hasMatchingTag = selectedTags.length === 0 || selectedTags.includes(item.category)
            const hasMatchingSecteur = selectedSecteurs.length === 0 // Toujours vrai car pas de secteurs pour l'instant

            return hasMatchingTag && hasMatchingSecteur
        })

    }, [projects, selectedTags, selectedSecteurs])

    return (
        <section className="work_overview">

            <div
                className={`
                    px-[var(--tw-4)] pb-[var(--tw-24)]
                    lg:px-[var(--tw-12)] lg:pb-[var(--tw-48)]
                `}
            >
                    <div
                        className={`
                            pb-4 hidden
                            lg:pb-12 lg:block
                        `}
                    >
                        <Filters
                            tagsArray={tagsArray}
                            secteursArray={secteursArray}
                            selectedTags={selectedTags}
                            selectedSecteurs={selectedSecteurs}
                            handleTagClick={handleTagClick}
                            handleSecteurClick={handleSecteurClick}
                        />
                    </div>

                    <div
                        className={`
                            grid gap-[var(--tw-4)]
                            md:grid-cols-2
                            lg:grid-cols-4 lg:gap-8
                        `}
                    >
                        {filteredWork.map((item, index) => {
                            return (
                                <WorkItem
                                    key={index}
                                    data={item}
                                    index={index}
                                />
                            )
                        }
                        )}
                    </div>

                </div>

        </section>
    )
}

export default WorkGrid