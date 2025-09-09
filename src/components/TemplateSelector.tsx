import { createSignal } from 'solid-js';

interface Template {
  icon: string;
  code: string;
}

interface TemplateCollection {
  [key: string]: Template;
}

interface TemplateSelectorProps {
  onSelect: (template: string) => void;
  onClose: () => void;
}

const templates: TemplateCollection = {
  'Flowchart': {
    icon: '📊',
    code: `graph TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    B -->|No| D[End]
    C --> D`
  },
  'Sequence Diagram': {
    icon: '🔄',
    code: `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!`
  },
  'Gantt Chart': {
    icon: '📅',
    code: `gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d`
  },
  'Class Diagram': {
    icon: '🏗️',
    code: `classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }`
  },
  'State Diagram': {
    icon: '🔄',
    code: `stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`
  },
  'Entity Relationship': {
    icon: '🗃️',
    code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
    
    CUSTOMER {
        string name
        string custNumber
        string sector
    }
    ORDER {
        int orderNumber
        string deliveryAddress
    }
    LINE-ITEM {
        string productCode
        int quantity
        float pricePerUnit
    }`
  },
  'User Journey': {
    icon: '🚶',
    code: `journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me`
  },
  'Pie Chart': {
    icon: '🥧',
    code: `pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15`
  },
  'Git Graph': {
    icon: '🌲',
    code: `gitgraph
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit`
  },
  'Mindmap': {
    icon: '🧠',
    code: `mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid`
  },
  'Timeline': {
    icon: '⏰',
    code: `timeline
    title History of Social Media Platform
    2002 : LinkedIn
    2004 : Facebook
         : Google
    2005 : Youtube
    2006 : Twitter`
  },
  'Quadrant Chart': {
    icon: '📐',
    code: `quadrantChart
    title Reach and influence
    x-axis Low Reach --> High Reach
    y-axis Low Influence --> High Influence
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]`
  }
};

export function TemplateSelector(props: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = createSignal('all');
  
  const categories = ['all', 'basic', 'process', 'data', 'advanced'];
  
  const getTemplatesByCategory = (category: string) => {
    if (category === 'all') return Object.entries(templates);
    
    const categoryMap: { [key: string]: string[] } = {
      'basic': ['Flowchart', 'Pie Chart', 'Mindmap'],
      'process': ['Sequence Diagram', 'State Diagram', 'User Journey', 'Timeline'],
      'data': ['Class Diagram', 'Entity Relationship', 'Gantt Chart'],
      'advanced': ['Git Graph', 'Quadrant Chart']
    };
    
    return Object.entries(templates).filter(([name]) => 
      categoryMap[category]?.includes(name)
    );
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Choose a Template
          </h2>
          <button
            onClick={props.onClose}
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div class="flex space-x-2">
            {categories.map(category => (
              <button
                onClick={() => setSelectedCategory(category)}
                class={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory() === category
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div class="p-6 overflow-y-auto max-h-96">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getTemplatesByCategory(selectedCategory()).map(([name, template]) => (
              <button
                onClick={() => props.onSelect(template.code)}
                class="text-left p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all group"
              >
                <div class="flex items-center mb-2">
                  <span class="text-2xl mr-3">{template.icon}</span>
                  <h3 class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {name}
                  </h3>
                </div>
                <pre class="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded overflow-hidden">
                  {template.code.split('\n').slice(0, 4).join('\n')}
                  {template.code.split('\n').length > 4 ? '\n...' : ''}
                </pre>
              </button>
            ))}
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
          <div class="flex justify-between items-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Click on any template to load it into the editor
            </p>
            <button
              onClick={props.onClose}
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}