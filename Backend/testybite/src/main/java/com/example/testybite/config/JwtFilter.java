package com.example.testybite.config;

import com.example.testybite.service.JwtService;
import com.example.testybite.service.MyUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;  // Service to handle JWT operations like extract and validate

    @Autowired
    MyUserDetailService userDetailService;  // Service to load user details from DB

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Get Authorization header from the request
        String authHeader = request.getHeader("Authorization");

        String token = null;
        String username = null;

        // Check if Authorization header is present and starts with "Bearer "
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Extract the token part from the header
            token = authHeader.substring(7);

            // Extract username from the token
            username = jwtService.extractUsername(token);
        }

        // If username is extracted and no authentication is set in context
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details from database
            UserDetails userDetails = userDetailService.loadUserByUsername(username);

            // Validate the token with the user details
            if (jwtService.validateToken(token, userDetails)) {
                // Create authentication token and set it in SecurityContext
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue with the filter chain
        filterChain.doFilter(request, response);
    }
}
