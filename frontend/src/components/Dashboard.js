// src/components/Dashboard.js

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, updateFilters } from '../store/dashboardSlice';
import * as d3 from 'd3';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard);
  const svgRef = useRef(null);

  const [filterValues, setFilterValues] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: '',
  });

  const drawBarChart = useCallback(() => {

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.title))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.title))
      .attr('y', d => yScale(d.intensity))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.intensity))
      .attr('fill', 'steelblue');
  }, [data]);

  useEffect(() => {
    dispatch(fetchData(filterValues));
  }, [dispatch, filterValues]);

  useEffect(() => {
    if (data.length) {
      drawBarChart();
    }
  }, [data, drawBarChart]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <input type="text" name="end_year" value={filterValues.end_year} onChange={handleInputChange} placeholder="End Year" />
        <input type="text" name="topic" value={filterValues.topic} onChange={handleInputChange} placeholder="Topic" />
        <input type="text" name="sector" value={filterValues.sector} onChange={handleInputChange} placeholder="Sector" />
        <input type="text" name="region" value={filterValues.region} onChange={handleInputChange} placeholder="Region" />
        <input type="text" name="pestle" value={filterValues.pestle} onChange={handleInputChange} placeholder="PEST" />
        <input type="text" name="source" value={filterValues.source} onChange={handleInputChange} placeholder="Source" />
        <input type="text" name="swot" value={filterValues.swot} onChange={handleInputChange} placeholder="SWOT" />
        <input type="text" name="country" value={filterValues.country} onChange={handleInputChange} placeholder="Country" />
        <input type="text" name="city" value={filterValues.city} onChange={handleInputChange} placeholder="City" />
        <button onClick={() => dispatch(updateFilters(filterValues))}>Apply Filters</button>
      </div>
      <svg ref={svgRef} width={500} height={300}></svg>
    </div>
  );
};

export default Dashboard;

