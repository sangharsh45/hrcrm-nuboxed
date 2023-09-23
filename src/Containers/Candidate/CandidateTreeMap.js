import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Tree from 'react-tree-graph'
import 'react-tree-graph/dist/style.css'

import './styles.css'
import rootNode from '../Candidate/Data'

// const data= {
//   name: 'Ahana',
//   children: [
    
//     {
//       name: 'Education',
//       children: [
//         {
//           name: 'Java',
         
//         },
//         {
//           name: 'React',
//         },
//         {
//           name: 'Angular',
//         },
//         {
//           name: 'C++',
//         },
//       ],
//     },
   
    
//     {
//       name: 'Training',
//       children: [
//         {
//           name: 'Undergoing',
//         },
//         {
//           name: 'Onsite',
//         },
//         {
//           name: 'Online',
//         },
//       ],
//     },
   
   
//   ],
// }

// const cloneWithDepth = (object, depth = 5) => {
//   if (depth === -1) return undefined
//   if (typeof object !== 'object') return object

//   if (Array.isArray(object)) {
//     return object
//       .map((val) => cloneWithDepth(val, depth - 1))
//       .filter((val) => val !== undefined)
//   }

//   const clone = {}

//   for (const key in object) {
//     if (typeof object['key'] === 'object' && depth - 1 === -1) {
//       continue
//     }

//     const clonedValue = cloneWithDepth(object[key], depth - 1)

//     if (clonedValue !== undefined) {
//       clone[key] = clonedValue
//     }
//   }

//   return clone
// }

// const findNode = (key, node = rootNode, parentPath = []) => {
//   const path = [...parentPath, node.name]

//   if (node.name === key) {
//     return { node: cloneWithDepth(node), path }
//   }

//   if (Array.isArray(node.children)) {
//     for (const child of node.children) {
//       const found = findNode(key, child, path)

//       if (found) return found
//     }
//   }
// }
const CandidateTreeMap = (props) => {
  console.log("Maped",props.candidateTreeMap)
  // const [data, setData] = useState(cloneWithDepth(rootNode))
  // const [path, setPath] = useState([rootNode.name])

  // const changeNode = ({ node, path }) => {
  //   setPath(path)
  //   setData(node)
  // }
  // const handleClick = (_, key) => {
  //   changeNode(findNode(key))
  // }
  const data=props.candidateTreeMap

  return (
   
    <React.Fragment>
      <div className="pulse-background">
        <Tree
          animated
          data={data}
          color="white"
          width={400}
          height={400}
          //style={{ backgroundColor:"whitesmoke"}}
          
          nodeRadius={15}
          // gProps={{ className: 'node', onClick: handleClick }}
          margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
        />
      </div>
    </React.Fragment>
  )
}

export default (CandidateTreeMap);