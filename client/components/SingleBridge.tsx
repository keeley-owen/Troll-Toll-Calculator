import { Bridge } from '../../models/bridge.ts'
import { getBridgesApi } from '../api/bridge.ts'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

export default function SingleBridge() {
  const { id } = useParams()
  const {
    data: bridges,
    error,
    isLoading,
  } = useQuery({ queryKey: ['bridges'], queryFn: getBridgesApi })

  if (error) {
    return <p>Your bridges are gone! What a massive error</p>
  }
  if (!bridges || isLoading) {
    return <p>Fetching bridges from auckland...</p>
  }

  const bridge = bridges.filter((br) => br.id === Number(id))

  return (
    <>
      <h1 id="single-bridge-title">{bridge[0].name}</h1>

      <div className="single-bridge-container">
        <div className="single-bridge-left-div">
          <img src="your-image.jpg" alt="Description of your image"></img>
        </div>
        <div className="right-bridge-right-div">
          <p>
            <strong>Type:</strong> {bridge[0].name}
          </p>
          <p>
            <strong>Lanes:</strong> {bridge[0].lanes}
          </p>
          <p>
            <strong>Length:</strong> {bridge[0].length_meters}
          </p>
          <p>
            <strong>Location:</strong> {bridge[0].location}
          </p>
          <p>
            <strong>Type:</strong> {bridge[0].type}
          </p>
          <p>
            <strong>Year Built:</strong> {bridge[0].year_built}
          </p>
          <p>
            <strong>Estimated Toll Earnings:</strong> {bridge[0].toll_charge}
          </p>
        </div>
      </div>
    </>
  )
}
